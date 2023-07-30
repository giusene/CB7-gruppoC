import { useState, useContext, useLayoutEffect } from "react";

// import db
import { arrayUnion, setDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/plugins/firebase";

import { MainContext } from "@/store";

import styles from "./Comments.module.scss";

const Comments = ({ id, comments }) => {
  const { state } = useContext(MainContext);

  const [comment, setComment] = useState("");
  const [commentsArr, setCommentsArr] = useState([]);

  useLayoutEffect(() => setCommentsArr(comments), [comments]);

  const onChangeValue = (e) => setComment(e.target.value);

  const onHandleSubmit = (e) => {
    e.preventDefault();

    if (state.user.isLogged) {
      const docRef = doc(db, "movies", id.toString());

      if (commentsArr.length > 0) {
        updateDoc(docRef, {
          id: id,
          comments: arrayUnion({
            id: Date.now(),
            commentText: comment,
            date: new Date().toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            user: {
              id: state.user.id,
              firstName: state.user.firstName,
              lastName: state.user.lastName,
              userImg: state.user.userImg,
            },
          }),
        });

        alert("updateDoc");
      } else {
        setDoc(
          docRef,
          {
            id: id,
            comments: [
              {
                id: Date.now(),
                commentText: comment,
                date: new Date().toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
                user: {
                  id: state.user.id,
                  firstName: state.user.firstName,
                  lastName: state.user.lastName,
                  userImg: state.user.userImg,
                },
              },
            ],
          },
          { merge: true }
        );

        alert("setDoc");
      }

      setCommentsArr([
        ...commentsArr,
        {
          id: Date.now(),
          commentText: comment,
          date: new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          user: {
            id: state.user.id,
            firstName: state.user.firstName,
            lastName: state.user.lastName,
            userImg: state.user.userImg,
          },
        },
      ]);
      setComment("");
    }
    // TODO
    else alert("Please log in to comment");
  };

  return (
    <div className={`${styles.Comments} col-12`}>
      <form onSubmit={onHandleSubmit} className={styles.commentsForm}>
        <textarea
          placeholder="Leave a comment..."
          onChange={onChangeValue}
          value={comment}
          required
          minLength={1}
          className={styles.commentInput}
        />
        <input
          type="submit"
          value={"submit"}
          className={styles.commentSubmit}
        />
      </form>
      <ul className={`${styles.commentSection}`}>
        {commentsArr.length ? (
          commentsArr.toReversed().map((comment) => (
            <li className={styles.commentContent} key={comment.id}>
              <div className={styles.commentUserDetails}>
                <img
                  className={styles.commentUserImg}
                  src={comment.user.userImg}
                />
                <div className={styles.commentUserText}>
                  <p className={styles.commentName}>{comment.user.firstName}</p>
                  <p className={styles.commentDate}>{comment.date}</p>
                </div>
              </div>
              <p className={styles.commentText}>{comment.commentText}</p>
            </li>
          ))
        ) : (
          <p>No comments here</p>
        )}
      </ul>
    </div>
  );
};

export default Comments;
