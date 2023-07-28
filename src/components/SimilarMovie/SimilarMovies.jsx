import styles from "./SimilarMovies.module.scss";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/Ai";
import { BsFillPeopleFill, BsPeople, BsFillPlayFill } from "react-icons/Bs";
import { SlArrowDown } from "react-icons/Sl";
import { AiFillStar } from "react-icons/Ai";

const SimilarMovies = ({ recommended }) => {
  return (
    <>
      <div className={styles.similarMovies}>
        {recommended.backdrop_path !== null && (
          <div className={styles.similarMovie}>
            <div className={styles.similarMovieImg}>
              <img
                className={styles.overlay}
                src={`https://image.tmdb.org/t/p/w185${recommended.backdrop_path}`}
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
