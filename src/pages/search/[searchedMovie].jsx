import { GET } from "@/utils/HTTP";
import { useRouter } from "next/router";
import Head from "next/head";
import Card from "@/components/Card/Card";
import styles from "@/styles/searchedMovieGrid.module.scss";
import { PiSmileySad } from "react-icons/pi";

export default function searchResult({ data }) {
  const router = useRouter();

  const backToHome = () => router.push("/");

  return (
    <>
      <Head>
        <title>
          Search results for "{router.query.searchedMovie}" - YouMovie
        </title>
        <meta
          name="description"
          content="Welcome to YouMovie, the movie database where you can create custom lists of movies and interact with the community through comments. Made for Edgemony - Silicon Valley Bootcamp Final Project 7"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.searchedMovie}>
        <h1 className={styles.searchTitle}>
          Search results for "{router.query.searchedMovie}"
        </h1>
        <div className={styles.searchResult}>
          {data.results.length ? (
            data.results.map((movie, i) => <Card mock={movie} key={i} />)
          ) : (
            <div className={styles.noResults}>
              <PiSmileySad size="5rem" />
              <div>
                Oh darn. We don't have that. Try searching for another movie or
                <p className={styles.backToHome} onClick={backToHome}>
                  Back to Home Page
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(router) {
  const data = await GET("search/", "movie", "", router.query.searchedMovie);

  return {
    props: {
      data,
    },
  };
}
