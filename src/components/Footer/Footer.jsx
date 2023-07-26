import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <img src="https://img.logoipsum.com/297.svg" />
      <h2>
        <Link href="/about-us">About us</Link>
      </h2>
    </div>
  );
};

export default Footer;
