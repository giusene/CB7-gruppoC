import { GET } from "@/utils/HTTP";
import { useRouter } from "next/router";
import Head from "next/head";
import Badge from "@/components/Badge";
import Card from "@/components/Card/Card";
import { genres } from "@/utils/genres";
import styles from "@/styles/searchedGenre.module.scss";

export default function ({ data }) {
  const router = useRouter();
  const genreName = genres.find((genre) => genre.id == router.query.id).name;

  return (
    <>
      <Head>
        <title>Browse movies by genre: {genreName} - YouMovie</title>
        <meta
          name="description"
          content="Welcome to YouMovie, the movie database where you can create custom lists of movies and interact with the community through comments. Made for Edgemony - Silicon Valley Bootcamp Final Project 7"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.genrePage}>
        <h2 className={styles.subtitle}>All genres</h2>
        <div className={styles.genreWrapper}>
          {genres.map((genre) => (
            <Badge data={genre} key={genre.id} />
          ))}
        </div>
        <div className={styles.lineWrapper}>
          <hr className={styles.line} />
        </div>
        <h1 className={styles.title}>Genre: {genreName}</h1>
        <div className={styles.wrapper}>
          {data.results.map((movie) => (
            <Card mock={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(router) {
  const data = await GET("discover/", "movie", router.query.id);

  return {
    props: {
      data,
    },
  };
}
