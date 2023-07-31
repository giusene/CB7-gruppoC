// import react
import { useContext, useState } from "react";

// import next
import { useRouter } from "next/router";

// import state
import { MainContext } from "@/store";

// import Google auth
import { auth, provider, db } from "@/plugins/firebase";
import { signInWithPopup } from "firebase/auth";

// import db
import { setDoc, doc, getDoc } from "firebase/firestore";

// import style
import styles from "./Navbar.module.scss";

//import components
import Sidebar from "../Sidebar/Sidebar";

import { BsSearch } from "react-icons/Bs";

const Navbar = () => {
  const { state, dispatch } = useContext(MainContext);

  const [userInput, setUserInput] = useState("");

  const router = useRouter();

  const onChangeValue = (e) => setUserInput(e.target.value);

  const onSubmitRoute = (e) => {
    setUserInput("");
    e.preventDefault();
    router.push(`/search/${userInput}`);
  };

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const signIn = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const userData = result._tokenResponse;
        return userData;
      })
      .then(async (userData) => {
        const docSnap = await getDoc(doc(db, "users", userData.localId));
        if (!docSnap.exists()) {
          setDoc(
            doc(db, "users", userData.localId),
            {
              id: userData.localId,
              firstName: userData.firstName || "",
              lastName: userData.lastName || "",
              email: userData.email || "",
              userImg: userData.photoUrl || "",
            },
            { merge: true }
          );
        }

        dispatch({
          type: "SET_USER_LOGGED",
          payload: {
            id: userData.localId,
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            userImg: userData.photoUrl || "",
          },
        });
      });
  };

  const onClickHomePage = () => router.push("/");

  return (
    <>
      <ul className={styles.Navbar}>
        <img
          className={styles.logoFull}
          src="https://img.logoipsum.com/297.svg"
          onClick={onClickHomePage}
        />
        <img
          className={styles.logoImg}
          src="https://img.logoipsum.com/296.svg"
          onClick={onClickHomePage}
        />
        <form onSubmit={onSubmitRoute}>
          <BsSearch />
          <input
            onChange={(e) => onChangeValue(e)}
            className={styles.input}
            type="text"
            placeholder="Search..."
            value={userInput}
          />
        </form>
        {state.user.isLogged ? (
          <>
            <div className={styles.welcome}>
              <p>Welcome, </p>
              <div className={styles.loggedUser} onClick={showSidebar}>
                <p>{state.user.firstName}</p>
                <img
                  className={styles.loggedUser__img}
                  src={state.user.userImg}
                  alt={state.user.firstName}
                />
              </div>
            </div>
          </>
        ) : (
          <button onClick={signIn}>Login</button>
        )}
      </ul>
      <Sidebar
        onClick={showSidebar}
        sidebar={sidebar}
        setSidebar={setSidebar}
      />
    </>
  );
};

export default Navbar;
