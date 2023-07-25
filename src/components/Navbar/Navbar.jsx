import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <ul className={styles.Navbar}>
      <img
        className={styles.logoFull}
        src="https://img.logoipsum.com/297.svg"
      />
      <img className={styles.logoImg} src="https://img.logoipsum.com/296.svg" />
      <input className={styles.input} type="text" placeholder="Search..." />
      <button>Login</button>
    </ul>
  );
};

export default Navbar;
