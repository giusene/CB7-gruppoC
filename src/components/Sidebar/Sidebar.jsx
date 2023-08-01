import { useContext } from "react";

import { MainContext } from "@/store";

import styles from "./Sidebar.module.scss";
import Link from "next/link";
import { WiTime3 } from "react-icons/wi";
import { AiOutlinePlus } from "react-icons/Ai";
import { FiStar } from "react-icons/Fi";
import { AiFillStar } from "react-icons/Ai";
import { BsBookmarkHeart } from "react-icons/Bs";
import { HiOutlineUserGroup } from "react-icons/Hi";
import { BiLogOut } from "react-icons/Bi";
import { RiArrowRightSLine } from "react-icons/Ri";
import { useRouter, useRouterRouter } from "next/router";

const Sidebar = ({ onClick, sidebar, setSidebar }) => {
  const { state, dispatch } = useContext(MainContext);

  const router = useRouter();

  const onHandleLogOut = () => {
    setSidebar(!sidebar);

    router.push("/");

    dispatch({
      type: "SET_USER_LOG_OUT",
      payload: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        userImg: "",
        favorites: [],
        list: [],
      },
    });
  };

  return (
    <div className={`${styles.sidebar} ${sidebar && styles.showsidebar}`}>
      <div className={styles.userInfo}>
        <div className={styles.user}>
          <img
            className={styles.userImage}
            src={state.user.userImg}
            alt={`${state.user.firstName} ${state.user.lastName}`}
          />
        </div>
        <div className={styles.userName}>
          <p>{`${state.user.firstName} ${state.user.lastName}`}</p>
        </div>
      </div>
      <div className={styles.sections}>
        <ul className={styles.sectionList}>
          <li className={styles.section}>
            <Link href="/" className={styles.item}>
              <p>
                <BsBookmarkHeart className={styles.icon} />
              </p>
              <p>WATCHLIST</p>
            </Link>
          </li>
          <li className={styles.section} onClick={() => setSidebar(!sidebar)}>
            <Link href="/community" className={styles.item}>
              <p>
                <HiOutlineUserGroup className={styles.icon} />
              </p>
              <p>COMMUNITY</p>
            </Link>
          </li>
        </ul>
        <div className={styles.logout} onClick={onHandleLogOut}>
          <div className={`${styles.logoutLink}`}>
            <p>
              <BiLogOut className={styles.icon} />
            </p>
            <p>LOGOUT</p>
          </div>
        </div>
      </div>
      <div className={styles.close} onClick={onClick}>
        <span>Close</span>
        <RiArrowRightSLine className={styles.closebtn} />
      </div>
    </div>
  );
};

export default Sidebar;
