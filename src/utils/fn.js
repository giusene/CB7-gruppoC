export const arrayShuffle = (array) => {
  let i = array.length;

  while (i) {
    const j = Math.floor(Math.random() * i--);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

export const genreRender = (genres, genreId) =>
  genres.map((genre) => genre.id === genreId && genre.name);
