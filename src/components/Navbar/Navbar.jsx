import styles from "./Navbar.module.scss";
import { app, auth, provider } from "@/plugins/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Navbar = () => {
  const signIn = async () => {
    const res = await signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
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

  return (
    <ul className={styles.Navbar}>
      <img
        className={styles.logoFull}
        src="https://img.logoipsum.com/297.svg"
      />
      <img className={styles.logoImg} src="https://img.logoipsum.com/296.svg" />
      <input className={styles.input} type="text" placeholder="Search..." />
      <button onClick={signIn}>Login</button>
    </ul>
  );
};

export default Navbar;
