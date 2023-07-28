import { GET } from "@/utils/HTTP";
import { useRouter } from "next/router";
import styles from "@/styles/Movie.module.scss";
import { AiFillStar } from "react-icons/Ai";
import Comments from "@/components/Comments";
import { AiOutlineHeart, AiFillHeart } from "react-icons/Ai";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/Ai";
import { BsFillPeopleFill, BsPeople, BsFillPlayFill } from "react-icons/Bs";
import { useState } from "react";
import SimilarMovies from "@/components/SimilarMovie";

export default function ({ movie, recommended }) {
  console.log(movie);
  console.log(recommended);

  const [addFilm, setAddFilm] = useState(false);
  const [likeFilm, setLikeFilm] = useState(false);
  const [suggestFilm, setSuggestFilm] = useState(false);

  const router = useRouter();

  const minutesInHours = (data) => {
    const hours = Math.floor(data / 60);
    const minutes = data % 60;

    return `${hours}h ${minutes}m`;
  };

  const roundToDecimal = (number) => {
    return Math.round(number * 10) / 10;
  };

  return (
    <div className={styles.Movie}>
      <div className={styles.mainContent}>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        />
        <h1>{movie.title}</h1>
        <p>"{movie.tagline}"</p>
        <div className={styles.watchTrailer}>
          <span className={styles.heroPlayIcon}>
            <BsFillPlayFill />
          </span>
          <span>Watch trailer</span>
        </div>
      </div>
      <div className={styles.movieInfoContainer}>
        <div className={styles.movieGeneral}>
          <p>
            <span className={styles.movieRatingIcon}>
              <AiFillStar />
            </span>
            {roundToDecimal(movie.vote_average)} |
          </p>
          <p>{movie.vote_count} • </p>
          <p>{movie.release_date.slice(0, 4)} •</p>
          <p>{minutesInHours(movie.runtime)}</p>
        </div>
        <div className={styles.movieInteractions}>
          <p className={styles.addFilm} onClick={() => setLikeFilm(!likeFilm)}>
            {likeFilm ? <AiFillHeart /> : <AiOutlineHeart />}
          </p>
          <p className={styles.addFilm} onClick={() => setAddFilm(!addFilm)}>
            {addFilm ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </p>
          <p onClick={() => setSuggestFilm(!suggestFilm)}>
            {suggestFilm ? <BsFillPeopleFill /> : <BsPeople />}
          </p>
        </div>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.overview}>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
        </div>
        <div className={styles.movieDescription}>
          <div className={styles.dataInfo}>
            <h3>Movie info</h3>
            <p>Original language: {movie.original_language}</p>
            <p>Budget: {movie.budget}</p>
            <p>Adult: {movie.adult ? "Yes" : "No"}</p>
          </div>
          <div className={styles.productions}>
            <h3>Production companies</h3>
            {movie.production_companies.map((movie) => (
              <div>
                <p>{movie.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <h2>Cast</h2>
      <div className={styles.peopleContainer}>
        <div className={styles.people}>
          {movie.credits.cast.slice(0, 5).map((data) => (
            <div key={data.id} className={styles.card}>
              <div className={styles.movieImg}>
                <img
                  src={`https://image.tmdb.org/t/p/w185${data.profile_path}`}
                />
              </div>
              <div className={styles.cardInfo}>
                <h3>{data.name}</h3>
                <p>{data.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.backdropsContainer}>
        <h2>Gallery</h2>
        <div className={styles.backdrops}>
          {movie.images.backdrops.map((data) => (
            <img src={`https://image.tmdb.org/t/p/w185${data.file_path}`} />
          ))}
        </div>
      </div>
      <h2>Similar Movies</h2>
      <div className={styles.similarMovies}>
        {recommended.results.map((movie) => (
          <SimilarMovies recommended={movie} />
        ))}
      </div>
      <Comments />
    </div>
  );
}

export async function getServerSideProps(router) {
  const movie = await GET("movie/", `${router.query.id}`);
  const recommended = await GET("movie/", `${router.query.id}/recommendations`);

  return {
    props: {
      movie,
      recommended,
    },
  };
}
