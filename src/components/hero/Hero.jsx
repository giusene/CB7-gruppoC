import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./Hero.module.scss";
import { AiFillStar } from "react-icons/ai";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { genres } from "@/utils/genres";
import { genreRender } from "@/utils/fn";

const Hero = ({ trending }) => {
  const [nextMovie, setNextMovie] = useState(0);
  const timerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    timerRef.current = setTimeout(onClickNextMovie, 6000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [nextMovie]);

  const onClickNextMovie = () => {
    nextMovie === 4 ? setNextMovie(0) : setNextMovie(nextMovie + 1);
  };

  const onClickPrevMovie = () => {
    nextMovie === 0 ? setNextMovie(4) : setNextMovie(nextMovie - 1);
  };

  const roundToDecimal = (number) => {
    return Math.round(number * 10) / 10;
  };

  const onClickMoviePage = () =>
    router.push(`movie/${trending.results[nextMovie].id}`);

  return (
    <section className={styles.hero}>
      <button className={styles.nextBtn} onClick={onClickNextMovie}>
        <MdOutlineKeyboardArrowRight />
      </button>
      <div className={`${styles.heroBackground} ${styles.next}`}>
        <img
          src={`https://image.tmdb.org/t/p/original${trending.results[nextMovie].backdrop_path}`}
          alt={trending.results[nextMovie].title}
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
            <span className={styles.votes}>
              {roundToDecimal(trending.results[nextMovie].vote_average)} (
              {trending.results[nextMovie].vote_count})
            </span>
          </p>
          <span className={styles.heroDate}>
            {trending.results[nextMovie].release_date.slice(0, 4)}
          </span>
          <span className={styles.heroGenre}>
            {genreRender(genres, trending.results[nextMovie].genre_ids[0])}
          </span>
        </div>
        <p className={styles.heroTrama}>
          {trending.results[nextMovie].overview}
        </p>
        <button className={styles.heroSeeMore} onClick={onClickMoviePage}>
          See more
        </button>
      </div>
      <button className={styles.prevBtn} onClick={onClickPrevMovie}>
        <MdOutlineKeyboardArrowLeft />
      </button>
    </section>
  );
};

export default Hero;
