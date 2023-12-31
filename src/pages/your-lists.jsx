import { getDoc, doc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "@/store";
import { db } from "@/plugins/firebase";
import Head from "next/head";
import styles from "@/styles/yourLists.module.scss";
import CommunityCards from "@/components/CommunityCards";

export default function () {
  const { state } = useContext(MainContext);
  const [community, setCommunity] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (state.user.isLogged) {
      const querySnapshot = async () => {
        const res = await getDoc(doc(db, "users", state.user.id));

        if (res.exists()) {
          setCommunity(res.data().community);
          setFavorites(res.data().favorites);
          setWatchlist(res.data().watchlist);
        }

        return res;
      };
      querySnapshot();
    }
  }, [state]);

  return (
    <div>
      <Head>
        <title>Your lists - YouMovie</title>
        <meta
          name="description"
          content="Welcome to YouMovie, the movie database where you can create custom lists of movies and interact with the community through comments. Made for Edgemony - Silicon Valley Bootcamp Final Project 7"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className={styles.mainContainer}>
        <h1>Your lists</h1>
        {state.user.isLogged ? (
          <>
            <div className={styles.cardsContainer}>
              <h2>Watchlist</h2>
              <div className={styles.cardsInfo}>
                {watchlist.length ? (
                  watchlist.map((movie) => (
                    <CommunityCards data={movie} key={movie.id} />
                  ))
                ) : (
                  <p>This list is empty</p>
                )}
              </div>
            </div>
            <div className={styles.cardsContainer}>
              <h2>Community</h2>
              <div className={styles.cardsInfo}>
                {community.length ? (
                  community.map((movie) => (
                    <CommunityCards data={movie} key={movie.id} />
                  ))
                ) : (
                  <p>This list is empty</p>
                )}
              </div>
            </div>
            <div className={styles.cardsContainer}>
              <h2>Favorites</h2>
              <div className={styles.cardsInfo}>
                {favorites.length ? (
                  favorites.map((movie) => (
                    <CommunityCards data={movie} key={movie.id} />
                  ))
                ) : (
                  <p>This list is empty</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className={styles.error}>
            You must be logged in to see your lists
          </p>
        )}
      </div>
    </div>
  );
}
