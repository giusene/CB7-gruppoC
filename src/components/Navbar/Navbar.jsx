// import react
import { useContext } from "react";

// import state
import { MainContext } from "@/store";

import styles from "./Navbar.module.scss";

// import Google auth
import { auth, provider, db } from "@/plugins/firebase";
import { signInWithPopup } from "firebase/auth";

// import db
import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

const Navbar = () => {
  const { state, dispatch } = useContext(MainContext);

  const signIn = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const userData = result._tokenResponse;
        return userData;
      })
      .then((userData) => {
        setDoc(
          doc(db, "users", userData.localId),
          {
            id: userData.localId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            userImg: userData.photoUrl,
          },
          { merge: true }
        );

        dispatch({
          type: "SET_USER_LOGGED",
          payload: {
            id: userData.localId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            userImg: userData.photoUrl,
          },
        });
      });
  };

  return (
    <ul className={styles.Navbar}>
      <img
        className={styles.logoFull}
        src="https://img.logoipsum.com/297.svg"
      />
      <img className={styles.logoImg} src="https://img.logoipsum.com/296.svg" />
      <input className={styles.input} type="text" placeholder="Search..." />
      {state.user.isLogged ? (
        <p>{state.user.firstName}</p>
      ) : (
        <button onClick={signIn}>Login</button>
      )}
    </ul>
  );
};

export default Navbar;
