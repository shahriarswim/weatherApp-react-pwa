import React, { useState } from 'react';

import { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (event) => {
    event.preventDefault();
    const data = await fetchWeather(query);

    setWeather(data);
    setQuery('');
  };

  return (
    <div className="container">
      <input
        type="text"
        className="search"
        placeholder="city name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn" onClick={search}>
        search
      </button>

      {weather.main && (
        <div className="city">
          <h2 className="city__name">
            <span>{weather.name}</span>
            <sup className="city__country">{weather.sys.country}</sup>
          </h2>
          <div className="city__temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="city__temp-detail">
            <p className="paragraph">
              Feels:
              {Math.round(weather.main.feels_like)}
              <sup className="paragraph__sup">&deg;C</sup>
            </p>

            <p className="paragraph">
              Humidity:
              {Math.round(weather.main.humidity)}
              <sup className="paragraph__sup">%</sup>
            </p>
            <p className="paragraph">
              Max:
              {Math.round(weather.main.temp_max)}
              <sup className="paragraph__sup">&deg;C</sup>
            </p>
            <p className="paragraph">
              Min:
              {Math.round(weather.main.temp_min)}
              <sup className="paragraph__sup">&deg;C</sup>
            </p>
          </div>

          <div className="city__info">
            <img
              className="city__icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p className="city__description">
              {weather.weather[0].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
