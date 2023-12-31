// import React
// import { useState } from "react";

// import style
import styles from "./Warning.module.scss";

// import assets
import { RxCross2 } from "react-icons/rx";

export const Warning = ({ type, content, modal, setModal }) => {
  setTimeout(() => {
    if (modal) {
      setModal(!modal);
    }
  }, 2000);

  return (
    <>
      <div
        className={`${styles.Warning} ${modal && styles.showModal} ${
          type === "ok" ? styles.okMessage : styles.koMessage
        }`}
      >
        {content}

        <span
          onClick={() => {
            setModal(!modal);
          }}
        >
          <RxCross2 />
        </span>
      </div>
    </>
  );
};
export default Warning;
