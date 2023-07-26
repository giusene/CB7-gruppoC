import { GET } from "@/utils/HTTP";
import { useRouter } from "next/router";
import Card from "@/components/Card/Card";
import styles from "@/styles/searchedMovieGrid.module.scss";

export default function searchResult({ data }) {
  const router = useRouter();

  return (
    <>
      <h1 className={styles.searchTitle}>
        Search results for "{router.query.searchedMovie}"
      </h1>
      <div className={styles.searchResult}>
        {data.results.map((movie, i) => (
          <Card mock={movie} key={i} />
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(router) {
  const data = await GET("search/", "movie", "", router.query.searchedMovie);

  return {
    props: {
      data,
    },
  };
}
