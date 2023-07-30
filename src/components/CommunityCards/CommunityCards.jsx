import styles from "./CommunityCards.module.scss";

const CommunityCards = ({ data }) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.movieImg}
        src={`https://image.tmdb.org/t/p/w185${data.poster_path}`}
      />
    </div>
  );
};

export default CommunityCards;
