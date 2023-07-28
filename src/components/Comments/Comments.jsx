import { useState, useContext } from "react";

// import db
import { arrayUnion, setDoc, getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/plugins/firebase";

import { MainContext } from "@/store";

import styles from "./Comments.module.scss";

const Comments = ({ data }) => {
  const { state } = useContext(MainContext);

  const [comment, setComment] = useState("");

  const [commentsArr, setCommentsArr] = useState([]);

  const onChangeValue = (e) => setComment(e.target.value);

  const onHandleSubmit = (e) => {
    e.preventDefault();

    if (state.user.isLogged) {
      // TODO: data.id.toString()
      const docRef = doc(db, "movies", "530");

      console.log(getDoc(docRef));

      if (docSnap.exists()) {
        updateDoc(docRef, {
          id: 530,
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
      } else {
        setDoc(
          docRef,
          {
            id: 530,
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
      }
    }
    // TODO
    else alert("not logged");
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <input
        type="text"
        placeholder="Leave a comment..."
        onChange={onChangeValue}
        value={comment}
        required
        minLength={1}
      />
      <input type="submit" value={"submit"} />
    </form>
  );
};

export default Comments;
