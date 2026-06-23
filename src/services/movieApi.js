import axios from 'axios';

const API_KEY = '2a856fae';
const BASE_URL = 'https://www.omdbapi.com';

export const searchMovies = async (category) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: category,
        type: 'movie',
      },
    });
    if (response.data.Search) {
      return response.data.Search.filter(
        (m) => m.Poster && m.Poster !== 'N/A'
      );
    }
    return [];
  } catch (error) {
    console.error('Movie API Error:', error);
    return [];
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: 'full',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Movie Details API Error:', error);
    return null;
  }
};
