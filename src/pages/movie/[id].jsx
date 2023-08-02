//states
import { useRouter } from "next/router";
//firebase
import {
  getDoc,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/plugins/firebase";
//icons
import { AiFillStar } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsFillPeopleFill, BsPeople, BsFillPlayFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "@/store";
//components
import Comments from "@/components/Comments";
import Head from "next/head";
import Warning from "@/components/warning";
import Trailer from "@/components/Trailer";
import SimilarMovies from "@/components/SimilarMovie";
//functions
import { GET } from "@/utils/HTTP";
//style
import styles from "@/styles/Movie.module.scss";

export default function ({ movie, recommended, comments }) {
  const { state, dispatch } = useContext(MainContext);
  const router = useRouter();
  const [addFilm, setAddFilm] = useState(false);
  const [likeFilm, setLikeFilm] = useState(false);
  const [suggestFilm, setSuggestFilm] = useState(false);
  const [trailer, setTrailer] = useState(false);
  // modals states
  const [watchlistModal, setWatchlistModal] = useState(false);
  const [likeModal, setLikeModal] = useState(false);
  const [suggestModal, setSuggestModal] = useState(false);

  useEffect(() => {
    if (state.user.isLogged) {
      const getData = async () => {
        const docSnap = await getDoc(doc(db, "users", state.user.id));

        if (docSnap.exists()) {
          const isInWatchlist = !!docSnap
            .data()
            .watchlist.find((movie) => movie.id == router.query.id);
          setAddFilm(isInWatchlist);
          const isLiked = !!docSnap
            .data()
            .favorites.find((movie) => movie.id == router.query.id);
          setLikeFilm(isLiked);
          const isSuggested = !!docSnap
            .data()
            .community.find((movie) => movie.id == router.query.id);
          setSuggestFilm(isSuggested);
        }
      };

      getData();
    }
  }, [state]);

  const onClickTrailer = () => {
    setTrailer(!trailer);
    document.body.style.overflow = "hidden";
    document.documentElement.scrollTop = 0;
  };

  const onClickCloseTrailer = () => {
    setTrailer(!trailer);
    document.body.style.overflow = "auto";
  };

  const minutesInHours = (data) => {
    const hours = Math.floor(data / 60);
    const minutes = data % 60;

    return `${hours}h ${minutes}m`;
  };

  const roundToDecimal = (number) => {
    return Math.round(number * 10) / 10;
  };

  const addToWatchlist = (movieId) => {
    if (state.user.isLogged) {
      setAddFilm(!addFilm);
      const userRef = doc(db, "users", state.user.id);
      if (addFilm) {
        movie.id === movieId &&
          updateDoc(userRef, {
            watchlist: arrayRemove({
              id: movie.id,
              poster: movie.poster_path,
              title: movie.title,
            }),
          });
      } else {
        movie.id === movieId &&
          updateDoc(userRef, {
            watchlist: arrayUnion({
              id: movie.id,
              poster: movie.poster_path,
              title: movie.title,
            }),
          });
      }
      setWatchlistModal(!watchlistModal);
    } else {
      setWatchlistModal(!watchlistModal);
    }
  };

  const addToLike = (movieId) => {
    if (state.user.isLogged) {
      setLikeFilm(!likeFilm);
      const userRef = doc(db, "users", state.user.id);
      if (likeFilm) {
        movie.id === movieId &&
          updateDoc(userRef, {
            favorites: arrayRemove({
              id: movie.id,
              poster: movie.poster_path,
              title: movie.title,
            }),
          });
      } else {
        movie.id === movieId &&
          updateDoc(userRef, {
            favorites: arrayUnion({
              id: movie.id,
              poster: movie.poster_path,
              title: movie.title,
            }),
          });
      }
      setLikeModal(!likeModal);
    } else {
      setLikeModal(!likeModal);
    }
  };

  const addToSuggested = (movieId) => {
    if (state.user.isLogged) {
      setSuggestFilm(!suggestFilm);
      const userRef = doc(db, "users", state.user.id);
      if (suggestFilm) {
        movie.id === movieId &&
          updateDoc(userRef, {
            community: arrayRemove({
              id: movie.id,
              poster: movie.poster_path,
              title: movie.title,
            }),
          });
      } else {
        movie.id === movieId &&
          updateDoc(userRef, {
            community: arrayUnion({
              id: movie.id,
              poster: movie.poster_path,
              title: movie.title,
            }),
          });
      }
      setSuggestModal(!suggestModal);
    } else {
      setSuggestModal(!suggestModal);
    }
  };

  return (
    <>
      <Head>
        <title>{movie.title} - YouMovie</title>
        <meta
          name="description"
          content="Welcome to YouMovie, the movie database where you can create custom lists of movies and interact with the community through comments. Made for Edgemony - Silicon Valley Bootcamp Final Project 7"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Warning
        type={state.user.isLogged ? "ok" : "ko"}
        content={
          state.user.isLogged
            ? likeFilm
              ? "Movie added to your favorites!"
              : "Movie removed from your favorites."
            : "You must be logged in to add movies to your favorites."
        }
        modal={likeModal}
        setModal={setLikeModal}
      />

      <Warning
        type={state.user.isLogged ? "ok" : "ko"}
        content={
          state.user.isLogged
            ? addFilm
              ? "Movie added to your watchlist!"
              : "Movie removed from your watchlist."
            : "You must be logged in to add movies to your watchlist."
        }
        modal={watchlistModal}
        setModal={setWatchlistModal}
      />

      <Warning
        type={state.user.isLogged ? "ok" : "ko"}
        content={
          state.user.isLogged
            ? suggestFilm
              ? "Movie added to your community list!"
              : "Movie removed from your community list."
            : "You must be logged in to add movies to your community list."
        }
        modal={suggestModal}
        setModal={setSuggestModal}
      />

      <div className={`${styles.container} ${trailer && styles.noScroll}`}>
        <div className={styles.Movie}>
          {trailer && (
            <div className={styles.TrailerContainer}>
              <Trailer movie={movie} />
              <div className={styles.closeBtn} onClick={onClickCloseTrailer}>
                <IoMdClose size={"2rem"} />
              </div>
            </div>
          )}
          <div className={styles.mainContent}>
            <img
              className={styles.imgFull}
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
            />
            <img
              className={styles.imgPoster}
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={`${movie.title} poster`}
            />
            <h1>{movie.title}</h1>
            {movie.tagline && <p>"{movie.tagline}"</p>}
            {movie.videos.results.length && (
              <button className={styles.watchTrailer} onClick={onClickTrailer}>
                <span className={styles.playIcon}>
                  <BsFillPlayFill />
                </span>
                Watch trailer
              </button>
            )}
          </div>
          <div className={styles.movieInfoContainer}>
            <div className={styles.movieGeneral}>
              <p>
                <span className={styles.movieRatingIcon}>
                  <AiFillStar />
                </span>
                <span>{roundToDecimal(movie.vote_average)}</span>
              </p>
              <p>({movie.vote_count}) • </p>
              <p>{movie.release_date.slice(0, 4)} •</p>
              <p>{minutesInHours(movie.runtime)} •</p>
              <p>{movie.genres[0].name}</p>
            </div>
            <div className={styles.movieInteractions}>
              <p
                className={styles.addFilm}
                onClick={() => addToLike(movie.id)}
                title={
                  likeFilm
                    ? "Remove from your favorites"
                    : "Add to your favorites"
                }
              >
                {likeFilm ? <AiFillHeart /> : <AiOutlineHeart />}
              </p>
              <p
                className={styles.addFilm}
                onClick={() => addToWatchlist(movie.id)}
                title={
                  addFilm
                    ? "Remove from your watchlist"
                    : "Add to your watchlist"
                }
              >
                {addFilm ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </p>
              <p
                onClick={() => addToSuggested(movie.id)}
                title={
                  suggestFilm
                    ? "Remove from your community list"
                    : "Add to your community list"
                }
              >
                {suggestFilm ? <BsFillPeopleFill /> : <BsPeople />}
              </p>
            </div>
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
              <p>Original language: {movie.original_language.toUpperCase()}</p>
              <p>Budget: {movie.budget ? movie.budget : "N/A"}</p>
              <p>Adult: {movie.adult ? "Yes" : "No"}</p>
            </div>
            <div className={styles.productions}>
              <h3>Production companies</h3>
              {movie.production_companies.map((movie) => (
                <div key={movie.id}>
                  <p>{movie.name}</p>
                </div>
              ))}
            </div>
          </div>
          <h2>Top Cast</h2>
          <div className={styles.peopleContainer}>
            <div className={styles.people}>
              {movie.credits.cast.slice(0, 5).map((data) => (
                <div key={data.id} className={styles.card}>
                  <div className={styles.movieImg}>
                    <img
                      src={
                        data.profile_path
                          ? `https://image.tmdb.org/t/p/w185${data.profile_path}`
                          : `https://www.exscribe.com/wp-content/uploads/2021/08/placeholder-image-person-jpg.jpg`
                      }
                      alt={data.name}
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
          {movie.images.backdrops.length ? (
            <div className={styles.backdropsContainer}>
              <h2>Gallery</h2>
              <div className={styles.backdrops}>
                {movie.images.backdrops.map((data, i) => (
                  <img
                    key={data.id}
                    src={`https://image.tmdb.org/t/p/original${data.file_path}`}
                    alt={`gallery image ${++i}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className={styles.blank}></p>
          )}
          {recommended.results.length ? (
            <>
              <h2>Similar Movies</h2>
              <div className={styles.similarMovies}>
                {recommended.results.map((movie) => (
                  <SimilarMovies key={movie.id} recommended={movie} />
                ))}
              </div>
            </>
          ) : (
            <p className={styles.blank}></p>
          )}
          <Comments id={movie.id} comments={comments} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(router) {
  const movie = await GET("movie/", `${router.query.id}`);

  const recommended = await GET("movie/", `${router.query.id}/recommendations`);

  const docSnap = await getDoc(doc(db, "movies", router.query.id.toString()));

  const comments = [];

  if (docSnap.exists())
    docSnap.data().comments.forEach((comment) => comments.push(comment));

  return {
    props: {
      key: router.query.id,
      movie,
      recommended,
      comments,
    },
  };
}

// Movie.getInitialProps = (router) => ({
//   key: router.query.id,
// });
