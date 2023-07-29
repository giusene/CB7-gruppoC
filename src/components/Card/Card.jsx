import styles from "./Card.module.scss";
import { AiOutlinePlus } from "react-icons/Ai";
import { BsFillPeopleFill, BsPeople, BsFillPlayFill } from "react-icons/Bs";
import { SlArrowDown } from "react-icons/Sl";
import { AiFillStar } from "react-icons/Ai";
import { useState } from "react";
import { useRouter } from "next/router";

const Card = ({ mock }) => {
  const [overlay, setOverlay] = useState(false);
  const onOverlay = () => setOverlay((prev) => !prev);

  const router = useRouter();

  const onClickMovie = () => router.push(`/movie/${mock.id}`);

  const [heart, setHeart] = useState(false);
  const changedHeart = () => setHeart((prev) => !prev);

  const [plus, setPlus] = useState(false);
  const changePlus = () => setPlus((prev) => !prev);

  const [people, setPeople] = useState(false);
  const changePeople = () => setPeople((prev) => !prev);

  const minutesInHours = (data) => {
    const hours = Math.floor(data / 60);
    const minutes = data % 60;

    return `${hours}h ${minutes}m`;
  };



  const roundToDecim = (number) => {
    return Math.round(number * 10) / 10;
  };


  const truncateString = (string, wordsNumber) => {
    return string.split(" ").splice(0, wordsNumber).join(" ");
  };

  return (
    mock.backdrop_path && (
      <>
        <div className={styles.Card}>
          <div className={styles.bgCard} onClick={onOverlay}>
            <img
              className={styles.bgImage}
              src={`https://image.tmdb.org/t/p/w300${mock.backdrop_path}`}
              alt=""
            />
            <div className={styles.black}>
              <p
                className={`${styles.black_parag} ${overlay && styles.noTitle}`}
              >
                {mock.title}
              </p>
            </div>
          </div>
          <div
            className={`${styles.text} ${overlay && styles.overlay}`}
            onClick={onClickMovie}
          >
            <div className={styles.left}>
              <div className={styles.card_title}>
                <h3 className={styles.text_title}>{mock.title}</h3>
              </div>
              <div className={styles.info}>
                <div className={styles.date}>
                  <p className={styles.year}>{mock.release_date.slice(0, 4)}</p>

                  <p className={styles.votes}>
                    <AiFillStar className={styles.star} />
                    {`${Math.round(mock.vote_average * 10) / 10} (${
                      mock.vote_count
                    } votes)`}
                  </p>
                </div>
                {mock.runtime && (
                  <div className="duration">{minutesInHours(mock.runtime)}</div>
                )}
              </div>
              <div className="card_description">
                <p className={styles.overview}>
                  {`${truncateString(mock.overview, 20)} ...`}
                </p>
              </div>

              <div className={styles.close_button}>
                <SlArrowDown
                  className={styles.close}
                  onClick={() => setOverlay(false)}
                />
              </div>
            </div>

            <div className={styles.icons}>
              <p className={styles.action}>
                <BsFillPlayFill className={styles.heart} />
              </p>
              <p className={styles.action} onClick={() => changePlus()}>
                <AiOutlinePlus className={styles.plus} />
              </p>
              <p className={styles.action} onClick={() => changePeople()}>
                {people ? (
                  <BsFillPeopleFill className={styles.people} />
                ) : (
                  <BsPeople className={styles.people} />
                )}
              </p>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Card;
