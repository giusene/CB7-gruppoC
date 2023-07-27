import { GET } from "@/utils/HTTP";
import { useRouter } from "next/router";
import Head from "next/head";
import Card from "@/components/Card/Card";
import styles from "@/styles/searchedGenre.module.scss";
import { genres } from "@/utils/genres";

export default function ({ data }) {
  const router = useRouter();
  const genreName = genres.find((genre) => genre.id == router.query.id).name;

  return (
    <>
      <Head>
        <title>Browse movies by genre: {genreName}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>Genre: {genreName}</h1>
      <div className={styles.wrapper}>
        {data.results.map((movie) => (
          <Card mock={movie} key={movie.id} />
        ))}
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
