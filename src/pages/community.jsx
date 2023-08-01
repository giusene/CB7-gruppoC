import { useLayoutEffect, useState } from "react";
import { db } from "@/plugins/firebase";
import { getDocs, collection } from "firebase/firestore";
import { arrayShuffle } from "@/utils/fn.js";
import Head from "next/head";
import CommunityCards from "@/components/CommunityCards/CommunityCards";
import styles from "@/styles/Community.module.scss";

export default function ({ lists }) {
  const [shuffledLists, setShuffledLists] = useState([]);
  useLayoutEffect(() => {
    setShuffledLists(arrayShuffle(lists));
  }, []);

  return (
    <>
      <Head>
        <title>Suggested by our community - YouMovie</title>
        <meta
          name="description"
          content="Welcome to YouMovie, the movie database where you can create custom lists of movies and interact with the community through comments. Made for Edgemony - Silicon Valley Bootcamp Final Project 7"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainContainer}>
        <h1>Community</h1>
        {shuffledLists.map((user) => (
          <div key={user.id} className={styles.cardsContainer}>
            <div className={styles.userInfo}>
              <span>Suggested by </span>
              <span className={styles.user}>
                <img
                  src={user.userImg}
                  alt={`${user.firstName} ${user.lastName}`}
                />
                <span>
                  {user.firstName} {user.lastName}
                </span>
              </span>
            </div>
            <div className={styles.cardsInfo}>
              {user.community.map((movie) => (
                <CommunityCards data={movie} key={movie.id} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const lists = [];

  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    if (doc.data().community.length) {
      lists.push(doc.data());
    }
  });

  return {
    props: {
      lists,
    },
  };
}
