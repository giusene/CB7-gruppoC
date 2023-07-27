import React, { useState, useEffect, useRef } from "react";
import styles from "./Hero.module.scss";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/Ai";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/Md";

const Hero = ({ trending }) => {
  const [nextMovie, setNextMovie] = useState(0);
  const movie = useRef();

  useEffect(() => {
    setTimeout(onClickNextMovie, 1000);
  }, [nextMovie]);

  const onClickNextMovie = () => {
    nextMovie === 5 ? setNextMovie(0) : setNextMovie((prev) => prev + 1);
  };

  const onClickPrevMovie = () => {
    nextMovie === 0 ? setNextMovie(4) : setNextMovie((prev) => prev - 1);
  };

  return (
    <section className={styles.hero} ref={movie}>
      <button className={styles.nextBtn} onClick={onClickNextMovie}>
        <MdOutlineKeyboardArrowRight />
      </button>
      <div className={`${styles.heroBackground} ${styles.next}`}>
        <img
          src={`https://image.tmdb.org/t/p/original${trending.results[nextMovie].backdrop_path}`}
        />
      </div>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          {trending.results[nextMovie].title}
        </h1>
        <div className={styles.heroGeneral}>
          <p className={styles.heroRating}>
            <span className={styles.heroRatingIcon}>
              <AiFillStar />
            </span>
            <span>
              {trending.results[nextMovie].vote_average} /
              {trending.results[nextMovie].vote_count}
            </span>
            <span className={styles.heroDate}>
              {trending.results[nextMovie].release_date}
            </span>
          </p>
        </div>
        <p className={styles.heroTrama}>
          {trending.results[nextMovie].overview}
        </p>

        <button className={styles.heroTrailer}>
          <p className={styles.heroPlayIcon}>
            <BsFillPlayFill />
          </p>
          Watch trailer
        </button>
      </div>
      <button className={styles.prevBtn} onClick={onClickPrevMovie}>
        <MdOutlineKeyboardArrowLeft />
      </button>
    </section>
  );
};

export default Hero;
