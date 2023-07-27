import styles from "./Card.module.scss";
import { AiFillHeart, AiOutlineHeart, AiOutlinePlusCircle, AiFillPlusCircle } from "react-icons/Ai";
import { BsFillPeopleFill, BsPeople } from "react-icons/Bs";
import { useState } from "react";

const Card = ({ mock }) => {

  const [overlay, setOverlay] = useState(false)
  const onOverlay = () => setOverlay(prev => !prev)

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

  return (
    mock.backdrop_path && (
      <>
        <div className={styles.Card} onClick={onOverlay}>
          <div className={styles.bgCard}>
            <img
              className={styles.bgImage}
              src={`https://image.tmdb.org/t/p/w300${mock.backdrop_path}`}
              alt=""
            />
            <div className={styles.black}>
              <p className={`${styles.black_parag} ${overlay && styles.noTitle}`}>{mock.title}</p>
            </div>
          </div>


          <div className={`${styles.text} ${overlay && styles.overlay}`}>
            <div className={styles.card_title}>
              <h3 className={styles.text_title}>{mock.title}</h3>
            </div>
            <div className={styles.info}>
              <div >
                <p className={styles.year}>{mock.release_date.slice(0, 4)}</p>
              </div>
              {mock.runtime && (
                <div className="duration">{minutesInHours(mock.runtime)}</div>
              )}
            </div>
            <div className="card_description">
              <p className={styles.overview}>
                {mock.overview.slice(0, 90) + "..."}
              </p>
            </div>
            <div className={styles.button}>
                <button>WATCH TRAILER</button>
            </div>
            <div className={styles.icons}>
              <p className={styles.action} onClick={() => changedHeart()}>
                {heart ? (
                  <AiFillHeart className={styles.heart} />
                ) : (
                  <AiOutlineHeart className={styles.heart} />
                )}
              </p>
              <p className={styles.action} onClick={() => changePlus()}>
                {plus ? (
                  <AiFillPlusCircle className={styles.plus} />
                ) : (
                  <AiOutlinePlusCircle className={styles.plus} />
                )}
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
