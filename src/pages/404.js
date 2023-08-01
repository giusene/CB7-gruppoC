import Head from "next/head";
import { useRouter } from "next/router";
import { PiSmileySad } from "react-icons/pi";
import styles from "@/styles/404.module.scss";

const error = () => {
  const router = useRouter();

  const backToHome = () => router.push("/");

  return (
    <>
      <Head>
        <title>Error 404 - YouMovie</title>
        <meta
          name="description"
          content="Welcome to YouMovie, the movie database where you can create custom lists of movies and interact with the community through comments. Made for Edgemony - Silicon Valley Bootcamp Final Project 7"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.error}>
        <div className={styles.noResults}>
          <PiSmileySad size="5rem" />
          <div>
            Page not found
            <p className={styles.backToHome} onClick={backToHome}>
              Back to Home Page
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default error;
