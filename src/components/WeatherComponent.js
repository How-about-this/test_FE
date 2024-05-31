import React, { useState } from 'react';
import axios from 'axios';

const apiWithoutToken = axios.create({
  baseURL: "/api", // API의 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});


const WeatherComponent = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiWithoutToken.get(`/weather`, { params: { city } });
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('Could not fetch weather data. Please try again.');
      setWeather(null);
    }
  };

  return (
    <div>
      <h1>Weather Information</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div>
          <h2>Weather in {city}</h2>
          <p>{JSON.stringify(weather)}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;