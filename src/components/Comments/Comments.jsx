import { useState, useContext, useLayoutEffect } from "react";
import { IoSendSharp } from "react-icons/io5";

// import db
import { arrayUnion, setDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/plugins/firebase";

import { MainContext } from "@/store";

import Warning from "@/components/warning";

import styles from "./Comments.module.scss";

const Comments = ({ id, comments }) => {
  const { state } = useContext(MainContext);

  const [modal, setModal] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsArr, setCommentsArr] = useState([]);

  useLayoutEffect(() => setCommentsArr(comments), [comments]);

  const onChangeValue = (e) => setComment(e.target.value);

  const onHandleSubmit = (e) => {
    e.preventDefault();

    if (state.user.isLogged) {
      const docRef = doc(db, "movies", id.toString());

      if (comment.length) {
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
      } else setModal(true);
    } else setModal(true);
  };

  return (
    <div className={`${styles.Comments} col-12`}>
      <Warning
        type="ko"
        content={
          state.user.isLogged &&
          "Oops! It seems like you forgot to enter any text. Please provide a sentence or a message to post your comment."
        }
        modal={modal}
        setModal={setModal}
      />
      <h2>
        Comments
        {commentsArr.length ? (
          <span> ({commentsArr.length})</span>
        ) : (
          <span></span>
        )}
      </h2>
      {state.user.isLogged ? (
        <form onSubmit={onHandleSubmit} className={styles.commentsForm}>
          <textarea
            placeholder="Leave a comment..."
            onChange={onChangeValue}
            value={comment}
            required
            minLength={1}
            className={styles.commentInput}
          />
          <div className={styles.submitWrapper}>
            <input
              type="submit"
              value={"Post"}
              className={styles.commentSubmit}
              title="Post"
            />
            <div 
              className={styles.submitIcon} 
              onClick={onHandleSubmit}
              title="Post"
            >
              <IoSendSharp />
            </div>
          </div>
        </form>
      ) : (
        <p>You must be logged in to post comments.</p>
      )}
      <ul className={`${styles.commentSection}`}>
        {commentsArr.length ? (
          commentsArr.toReversed().map((comment) => (
            <li className={styles.commentContent} key={comment.id}>
              <div className={styles.commentUserDetails}>
                <img
                  className={styles.commentUserImg}
                  src={comment.user.userImg}
                  alt={`${comment.user.firstName} ${comment.user.lastName}`}
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
          <p className={styles.placeholder}>No comments yet</p>
        )}
      </ul>
    </div>
  );
};

export default Comments;
