import styles from "./Card.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/Ai";
import { useState } from "react";

const Card = ({ mock }) => {
  const [heart, setHeart] = useState(false);
  const changedHeart = () => setHeart((prev) => !prev);
  const minutesInHours = (data) => {
    const hours = Math.floor(data / 60);
    const minutes = data % 60;

    return `${hours}h ${minutes}m`;
  };

  return (
    mock.backdrop_path && (
      <>
        <div className={styles.Card}>
          <div className={styles.bgCard}>
            <img
              className={styles.bgImage}
              src={`https://image.tmdb.org/t/p/w300${mock.backdrop_path}`}
              alt=""
            />
            <div className={styles.black}>
              <p className={styles.black_parag}>{mock.title}</p>
            </div>
          </div>
          <div className={styles.text}>
            <div className={styles.card_title}>
              <h3 className={styles.text_title}>{mock.title}</h3>
              <p className={styles.heart} onClick={() => changedHeart()}>
                {heart ? (
                  <AiFillHeart className={styles.heart_icon} />
                ) : (
                  <AiOutlineHeart className={styles.heart_icon} />
                )}
              </p>
            </div>
            <div className={styles.info}>
              <div className="year">
                <p>{mock.release_date.slice(0, 4)}</p>
              </div>
              {mock.runtime && (
                <div className="duration">{minutesInHours(mock.runtime)}</div>
              )}
            </div>
            <div className="card_description">
              <p className={styles.overview}>
                {mock.overview.slice(0, 100) + "..."}
              </p>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Card;
