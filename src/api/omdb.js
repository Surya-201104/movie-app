/* eslint-disable */
const API_KEY = "b29c2821";
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query, page = 1, type = "") {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}&type=${type}`
  );
  return res.json();
}

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
  return res.json();
}
