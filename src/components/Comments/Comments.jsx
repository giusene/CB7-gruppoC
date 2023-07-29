import { useState, useContext } from "react";

// import db
import {
  arrayUnion,
  setDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/plugins/firebase";

import { MainContext } from "@/store";

import styles from "./Comments.module.scss";

const Comments = ({ id, comments }) => {
  const { state } = useContext(MainContext);

  // TODO: controllare se si può togliere console.log
  const docSnap = onSnapshot(doc(db, "movies", id.toString()), (doc) => {
    console.log(doc.data());
  });

  const [comment, setComment] = useState("");
  const [commentsArr, setCommentsArr] = useState(comments);

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
            date: Date.now(),
            user: {
              id: state.user.id,
              firstName: state.user.firstName,
              lastName: state.user.lastName,
              userImg: state.user.userImg,
            },
          }),
        });

        console.log("updateDoc");
      } else {
        setDoc(
          docRef,
          {
            id: id,
            comments: [
              {
                id: Date.now(),
                commentText: comment,
                date: Date.now(),
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

        console.log("setDoc");
      }

      setCommentsArr([
        ...commentsArr,
        {
          id: Date.now(),
          commentText: comment,
          date: Date.now(),
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
    <div className={styles.Comments}>
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
      <ol className={styles.commentSection}>
        {commentsArr.map((comment) => (
          <li>{comment.commentText}</li>
        ))}
      </ol>
    </div>
  );
};

export default Comments;
