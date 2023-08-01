import Link from "next/link";
import styles from "./Footer.module.scss";
import Round from "@/Svg/Round";

const goOnTop = () => document.documentElement.scrollTop = 0;

const Footer = () => {
  return (
    <div className={styles.Footer} onClick={goOnTop}>
      <div className={styles.full_logo}>
        <Round className={styles.logo} />
        <span>YouMovie</span>
      </div>

      <div className={styles.line}></div>

      <h2>
        <Link href="/about-us">About us</Link>
      </h2>
    </div>
  );
};

export default Footer;
