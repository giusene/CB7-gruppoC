import Card from "../Card/Card";

import styles from "./Cards.module.scss";

const Cards = ({ data }) => {
  return (
    <>
      <div className={styles.Cards}>
        {data.results.map((mock) => (
          <Card mock={mock} key={mock.id} />
        ))}
      </div>
    </>
  );
};

export default Cards;
