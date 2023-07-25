const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const GET = async (type, endpoint, genre = "") => {
  const res = await fetch(
    `${BASE_URL}${type}/${endpoint}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos,images&include_image_language=en,null&with_genres=${genre}`
  );

  const data = res.json();

  return data;
};
