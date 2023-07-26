import styles from "./Navbar.module.scss";
import { app, auth, provider } from "@/plugins/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Eagle_Lake } from "next/font/google";
import { useState } from "react";
import { Router, useRouter } from "next/router";

const Navbar = () => {
  const [userInput, setUserInput] = useState("");

  const router = useRouter();
  const onChangeValue = (e) => setUserInput(e.target.value);
  const onSubmitRoute = (e) => {
    e.preventDefault();
    router.pathname.includes("search")
      ? router.push(userInput)
      : router.push(`search/${userInput}`);
  };

  const signIn = async () => {
    const res = await signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(result);
      console.log(credential);

      return user;
    });
    // .catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   // The AuthCredential type that was used.
    //   const credential = provider.credentialFromError(error);
    //   // ...
    // });
    // console.log(res);
    // return res;
  };

  const onClickHomePage = () => router.push("/");

  return (
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
        <input
          onChange={(e) => onChangeValue(e)}
          className={styles.input}
          type="text"
          placeholder="Search..."
        />
      </form>
      <button onClick={signIn}>Login</button>
    </ul>
  );
};

export default Navbar;
