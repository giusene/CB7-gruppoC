import { useLayoutEffect, useState } from "react";
import { db } from "@/plugins/firebase";
import { getDocs, collection } from "firebase/firestore";
import { arrayShuffle } from "@/utils/fn.js";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import Head from "next/head";
import CommunityCards from "@/components/CommunityCards/CommunityCards";
import styles from "@/styles/about-us.module.scss";

export default function ({ lists }) {
  const [shuffledLists, setShuffledLists] = useState([]);
  useLayoutEffect(() => {
    setShuffledLists(arrayShuffle(lists));
  }, []);

  return (
    <>
      <Head>
        <title>About Us - YouMovie</title>
        <meta
          name="description"
          content="Welcome to YouMovie, the movie database where you can create custom lists of movies and interact with the community through comments. Made for Edgemony - Silicon Valley Bootcamp Final Project 7"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainContainer}>
        <h1>Our team</h1>
        {shuffledLists
          .filter((users) => users.isAdmin)
          .map((user) => (
            <div key={user.id} className={styles.cardsContainer}>
              <div className={styles.adminsContainer}>
                <span className={styles.user}>
                  <img
                    src={user.userImg}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </span>
                <div className={styles.profiles}>
                  <a href={user.github} target="_blank">
                    <BsGithub />
                  </a>
                  <a href={user.linkedin} target="_blank">
                    <BsLinkedin />
                  </a>
                </div>
              </div>
              <h2 className={styles.listTitle}>My suggested list</h2>
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
