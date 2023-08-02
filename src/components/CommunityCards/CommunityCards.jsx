import styles from "./CommunityCards.module.scss";
import { useRouter } from "next/router";

const CommunityCards = ({ data }) => {
  const router = useRouter();

  const onClickMoviePage = () => router.push(`movie/${data.id}`);

  return (
    <div className={styles.card} onClick={onClickMoviePage} title={data.title}>
      <img
        className={styles.movieImg}
        src={`https://image.tmdb.org/t/p/w342${data.poster}`}
        alt={data.title}
      />
    </div>
  );
};

export default CommunityCards;
