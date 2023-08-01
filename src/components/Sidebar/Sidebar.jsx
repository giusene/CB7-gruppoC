import { useContext } from "react";

import { MainContext } from "@/store";

import styles from "./Sidebar.module.scss";
import Link from "next/link";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiLogOut, BiListPlus } from "react-icons/bi";

import { RiArrowRightSLine } from "react-icons/ri";
import { useRouter } from "next/router";

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
      },
    });
  };

  const onClickLists = () => setSidebar(!sidebar);

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
          <li className={styles.section} onClick={() => setSidebar(!sidebar)}>
            <Link href="/your-lists" className={styles.item}>
              <p>
                <BiListPlus className={styles.icon} />
              </p>
              <p>YOUR LISTS</p>
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
