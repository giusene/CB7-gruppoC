import React from "react";
import styles from "./Hero.module.scss";
import Link from "next/link";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

const elencoFilm = [
  {
    titolo: "Film 1",
    rating: 7.5,
    reviews: 248,
    durata: "2h 15min",
    genere: "Azione, Crime, Drammatico ",
    dataUscita: "2022",
    trama:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe minima, dolor cupiditate a error aperiam! Corrupti expedita temporibus quam libero cumque atque molestias natus quia quasi. Laudantium beatae totam ut.",
    img: "https://picsum.photos/seed/picsum/300/200",
  },
];

const Hero = () => {
  return (
    <section className={styles.hero}>
      {elencoFilm.map((film) => (
        <div
          className={styles.heroBackground}
          style={{ backgroundImage: `url(${elencoFilm[0].img})` }}
        >
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{film.titolo}</h1>
            <div className={styles.heroGeneral}>
              <p className={styles.heroRating}>
                <p className={styles.heroRatingIcon}>
                  <AiFillStar />
                </p>
                {film.rating} / {film.reviews}
              </p>
              <p className={styles.heroLenght}>{film.durata}</p>
              <p className={styles.heroGenre}>{film.genere}</p>
              <p className={styles.heroDate}>{film.dataUscita}</p>
            </div>
            <p className={styles.heroTrama}>{film.trama}</p>
            <button className={styles.heroPlay}>
              <p className={styles.heroPlayIcon}>
                <BsFillPlayFill />
              </p>
              PLAY NOW
            </button>

            <button className={styles.heroTrailer}>TRAILER</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Hero;
