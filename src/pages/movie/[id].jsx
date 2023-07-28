import { GET } from "@/utils/HTTP";
import { useRouter } from "next/router";
import styles from "@/styles/Movie.module.scss";

export default function ({ movie }) {
  console.log(movie);

  const router = useRouter();

  return (
    <div className={styles.Movie}>
      <div className={styles.mainContent}>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        />
        <h1>{movie.title}</h1>
      </div>
      <h2>Cast</h2>
      <div className={styles.people}>
        {movie.credits.cast.slice(0, 5).map((data) => (
          <div key={data.id} className={styles.card}>
            <div className={styles.movieImg}>
              <img
                src={`https://image.tmdb.org/t/p/w185${data.profile_path}`}
              />
            </div>
            <h3>{data.name}</h3>
          </div>
        ))}
      </div>
      <h2>Crew</h2>
      <div className={styles.people}>
        {movie.credits.crew.slice(0, 5).map((data) => (
          <div key={data.id} className={styles.card}>
            <div className={styles.movieImg}>
              <img
                src={
                  data.profile_path
                    ? `https://image.tmdb.org/t/p/w185${data.profile_path}`
                    : "https://img.icons8.com/?size=185&id=AjTPlMclWxjF&format=png"
                }
              />
            </div>
            <h3>{data.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(router) {
  const movie = await GET("movie/", `${router.query.id}`);

  return {
    props: {
      movie,
    },
  };
}
