import styles from "@/styles/404.module.scss";
import { PiSmileySad } from "react-icons/pi";
import { useRouter } from "next/router";

const error = () => {
  const router = useRouter();

  const backToHome = () => router.push("/");

  return (
    <div className={styles.error}>
      <div className={styles.noResults}>
        <PiSmileySad size="5rem" />
        <div>
          Page not found
          <p className={styles.backToHome} onClick={backToHome}>
            Back to Home Page
          </p>
        </div>
      </div>
    </div>
  );
};

export default error;
