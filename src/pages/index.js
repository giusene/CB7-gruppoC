import Head from "next/head";
import { Inter } from "next/font/google";
import { GET } from "@/utils/HTTP";
import Cards from "@/components/Cards/Cards";
import styles from "@/styles/Home.module.scss";
import Hero from "@/components/hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  trending,
  movieGenreAction,
  movieGenreAnimation,
  movieGenreDocumentary,
  movieGenreThriller,
  movieGenreTVMovie,
}) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero trending={trending} />
      <ul className={styles.categoryList}>
        <li>
          <h2>Trending today</h2>
          <Cards data={trending} />
        </li>
        <li>
          <h2>Action</h2>
          <Cards data={movieGenreAction} />
        </li>
        <li>
          <h2>Animation</h2>
          <Cards data={movieGenreAnimation} />
        </li>
        <li>
          <h2>Documentary</h2>
          <Cards data={movieGenreDocumentary} />
        </li>
        <li>
          <h2>Thriller</h2>
          <Cards data={movieGenreThriller} />
        </li>
        <li>
          <h2>TV Movie</h2>
          <Cards data={movieGenreTVMovie} />
        </li>
      </ul>
    </>
  );
}

export async function getServerSideProps() {
  const trending = await GET("trending/movie/", "day");
  const movieGenreAction = await GET("discover/", "movie", "28");
  const movieGenreAnimation = await GET("discover/", "movie", "16");
  const movieGenreDocumentary = await GET("discover/", "movie", "99");
  const movieGenreThriller = await GET("discover/", "movie", "53");
  const movieGenreTVMovie = await GET("discover/", "movie", "10770");

  return {
    props: {
      trending,
      movieGenreAction,
      movieGenreAnimation,
      movieGenreDocumentary,
      movieGenreThriller,
      movieGenreTVMovie,
    },
  };
}
