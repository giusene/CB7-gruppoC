import styles from "./SimilarMovies.module.scss";
import { useRouter } from "next/router";

const SimilarMovies = ({ recommended }) => {
  const router = useRouter();

  const onClickMoviePage = () => router.push(`/movie/${recommended.id}`);

  return (
    <>
      <div
        className={styles.similarMovies}
        onClick={onClickMoviePage}
        title={recommended.title}
      >
        {recommended.backdrop_path !== null && (
          <div className={styles.similarMovie}>
            <div className={styles.similarMovieImg}>
              <img
                className={styles.overlay}
                src={`https://image.tmdb.org/t/p/w780${recommended.backdrop_path}`}
                alt={recommended.title}
              />
              <h3>{recommended.title}</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SimilarMovies;
