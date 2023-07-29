import { useState, useContext, useEffect, useLayoutEffect } from "react";

// import db
import { arrayUnion, setDoc, getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/plugins/firebase";

import { MainContext } from "@/store";

import styles from "./Comments.module.scss";

const Comments = ({ id, comments }) => {
  const { state, dispatch } = useContext(MainContext);
  // console.log(comments);
  // console.log(state.comments);
  // console.log(state);

  // useEffect(() => {
  //   dispatch({
  //     type: "SET_COMMENTS",
  //     payload: comments,
  //   });
  // }, [comments]);

  const [comment, setComment] = useState("");

  const onChangeValue = (e) => setComment(e.target.value);

  const onHandleSubmit = (e) => {
    e.preventDefault();

    if (state.user.isLogged) {
      const docRef = doc(db, "movies", id.toString());

      if (comments.length) {
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
            comments: {
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
          },
          { merge: true }
        );

        console.log("setDoc");
      }

      // dispatch({
      //   type: "ADD_NEW_COMMENT",
      //   payload: {
      //     id: Date.now(),
      //     commentText: comment,
      //     date: Date.now(),
      //     user: {
      //       id: state.user.id,
      //       firstName: state.user.firstName,
      //       lastName: state.user.lastName,
      //       userImg: state.user.userImg,
      //     },
      //   },
      // });

      // console.log(state.comments);
      setComment("");
    }
    // TODO
    else alert("not logged");
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
        {comments.map((comment) => (
          <li>{comment.commentText}</li>
        ))}
      </ol>
    </div>
  );
};

export default Comments;
