import React, { useState, useEffect } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
  const [formData, setFormData] = useState({
    city: 'London',
  });
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${formData.city}&appid=39d15f2e7303db516c6b8a7f5f471ca3&units=${unit}`);
        if (!response.ok) {
          throw new Error('City not found');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [formData.city, unit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
        placeholder="Enter city"
      />
      <div className="flex-item">
      <button onClick={() => setFormData({ ...formData, city: formData.city })}>Get Weather</button>
      <button onClick={toggleUnit}>Toggle to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °{unit === 'metric' ? 'C' : 'F'}</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;