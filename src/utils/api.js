import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2E5OGMwOWMxOGI1NGI5N2QxMWZhNjc1OTQ3ZTg3NCIsInN1YiI6IjY2M2NkMWVkOTE0ZDU3Mzk3OGEzYTVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QolpQb14AqeoTLTi82N57BCMVqe1ElKcMma52lecNqM";

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, { headers, params });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
