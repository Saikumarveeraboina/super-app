import React, { useState, useEffect } from 'react';
import { getWeather } from '../../services/weatherApi';
import './WeatherCard.css';

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeather('Mumbai');
      if (data) {
        setWeather(data);
      }
    };
    fetchWeather();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  return (
    <div className="weather-card" id="weather-card">
      <div className="weather-header">
        <span className="weather-date">{formatDate(dateTime)}</span>
        <span className="weather-time">{formatTime(dateTime)}</span>
      </div>

      <div className="weather-body">
        {weather ? (
          <>
            <div className="weather-main">
              <div className="weather-icon-temp">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="weather-icon"
                />
                <span className="weather-temp">
                  {Math.round(weather.main.temp)}°C
                </span>
              </div>
              <div className="weather-details-right">
                <div className="weather-detail-item">
                  <span className="weather-detail-value">
                    {weather.wind.speed} km/h
                  </span>
                  <span className="weather-detail-label">Wind</span>
                </div>
              </div>
            </div>

            <div className="weather-description">
              {weather.weather[0].description
                .split(' ')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ')}
            </div>

            <div className="weather-extra">
              <div className="weather-detail-item">
                <span className="weather-detail-icon">↕</span>
                <span className="weather-detail-value">
                  {weather.main.pressure} mbar
                </span>
                <span className="weather-detail-label">Pressure</span>
              </div>
              <div className="weather-detail-item">
                <span className="weather-detail-icon">💧</span>
                <span className="weather-detail-value">
                  {weather.main.humidity}%
                </span>
                <span className="weather-detail-label">Humidity</span>
              </div>
            </div>
          </>
        ) : (
          <div className="weather-loading">Loading weather...</div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
