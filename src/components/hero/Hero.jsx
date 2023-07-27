import React, { useState, useEffect } from "react";
import styles from "./Hero.module.scss";
// import Link from "next/link";
import { GET } from "@/utils/HTTP";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/Ai";

const Hero = ({ trending }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <img
          src={`https://image.tmdb.org/t/p/w1280${trending.results[9].backdrop_path}`}
        />
      </div>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{trending.results[0].title}</h1>
        <div className={styles.heroGeneral}>
          <p className={styles.heroRating}>
            <span className={styles.heroRatingIcon}>
              <AiFillStar />
            </span>
            <span>
              {trending.results[0].vote_average} /
              {trending.results[0].vote_count}
            </span>
          </p>
          <p className={styles.heroLenght}></p>
          <p className={styles.heroGenre}></p>
          <p className={styles.heroDate}>{trending.results[0].release_date}</p>
        </div>
        <p className={styles.heroTrama}>{trending.results[0].overview}</p>

        <button className={styles.heroPlay}>
          <p className={styles.heroPlayIcon}>
            <BsFillPlayFill />
          </p>
          PLAY NOW
        </button>
        <button className={styles.heroTrailer}>TRAILER</button>
      </div>
    </section>
  );
};

export default Hero;
