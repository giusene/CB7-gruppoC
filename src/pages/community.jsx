import CommunityCards from "@/components/CommunityCards/CommunityCards";
import styles from "@/styles/Community.module.scss";
import { GET } from "@/utils/HTTP";

export default function ({ trending }) {
  const users = [
    {
      id: 1,
      name: "name1",
      surname: "surname1",
      username: "username1",
      img: "https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=",
    },

    {
      id: 2,
      name: "name2",
      surname: "surname2",
      username: "username2",
      img: "https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=",
    },

    {
      id: 3,
      name: "name3",
      surname: "surname3",
      username: "username3",
      img: "https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=",
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <h1>Community</h1>
      {users.map((user) => (
        <div key={user.id} className={styles.cardsContainer}>
          <div className={styles.userInfo}>
            <span>Suggested by </span>
            <img src={user.img} />
            <span>{user.name} </span>
            <span>{user.surname}</span>
          </div>
          <div className={styles.cardsInfo}>
            {trending.results.map((movie) => (
              <CommunityCards data={movie} key={movie.id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const trending = await GET("trending/movie/", "day");

  return {
    props: {
      trending,
    },
  };
}
