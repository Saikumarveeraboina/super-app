import axios from 'axios';

const API_KEY = '2080e48ff25ed151e4c7e491e494c1a1';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const FALLBACK_WEATHER = {
  weather: [
    {
      description: 'heavy rain',
      icon: '10d',
      main: 'Rain',
    },
  ],
  main: {
    temp: 24,
    pressure: 1013,
    humidity: 83,
  },
  wind: {
    speed: 3.7,
  },
  name: 'Mumbai',
};

export const getWeather = async (city = 'Mumbai') => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Weather API Error:', error);
    // Return fallback data so the UI still renders
    return FALLBACK_WEATHER;
  }
};
