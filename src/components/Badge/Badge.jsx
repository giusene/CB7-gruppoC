import { useRouter } from "next/router";
import styles from "./Badge.module.scss";

const Badge = ({ data }) => {
  const router = useRouter();

  return (
    <div
      className={styles.Badge}
      onClick={() => router.push(`/genre/${data.id}`)}
      title={data.name}
    >
      {data.name}
    </div>
  );
};

export default Badge;
