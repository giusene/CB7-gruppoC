import Footer from "@/components/Footer";
import styles from "./DefaultLayout.module.scss";
import Navbar from "@/components/Navbar";

const DefaultLayout = ({ children }) => {
  return (
    <div className={styles.DefaultLayout}>
      <Navbar />
      <div className={`${styles.content} col-12`}>{children}</div>
      <Footer />
    </div>
  );
};
export default DefaultLayout;
