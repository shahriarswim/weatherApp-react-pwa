import axios from 'axios';

export const fetchWeather = async (query) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/weather',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': 'Your Api key',
        useQueryString: true,
      },
      params: {
        q: query,
        units: 'metric',
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
