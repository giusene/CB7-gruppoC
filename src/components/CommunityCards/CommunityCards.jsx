import styles from "./CommunityCards.module.scss";
import { useRouter } from "next/router";

const CommunityCards = ({ data }) => {
  const router = useRouter();

  const onClickMoviePage = () => router.push(`movie/${data.id}`);

  return (
    <div className={styles.card} onClick={onClickMoviePage}>
      <img
        className={styles.movieImg}
        src={`https://image.tmdb.org/t/p/w185${data.poster_path}`}
      />
    </div>
  );
};

export default CommunityCards;
