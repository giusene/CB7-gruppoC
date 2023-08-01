import styles from "./Trailer.module.scss";

const Trailer = ({ movie }) => {
  return (
    <div className={styles.Trailer}>
      <iframe
        src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
      />
    </div>
  );
};

export default Trailer;
