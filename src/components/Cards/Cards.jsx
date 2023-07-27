import Card from "../Card/Card";

import styles from "./Cards.module.scss";
import { useRef, useEffect, useState } from "react";

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
