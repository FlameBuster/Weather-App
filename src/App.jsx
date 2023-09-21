import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API_KEY = "7eaf963822cc401c997153038232009";

  const [inputValue, setInputValue] = useState("");
  const [location, setLocation] = useState("New Delhi");
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [location]);

  const handleSubmit = (e) => {
    setLocation(inputValue);
    setInputValue("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const fetchData = () => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}`
    )
      .then((res) => res.json())
      .then((data) => {
        setForecastData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };
  return (
    <div className="app">
      <div className="card">
        <h2 className="card-title">Weather</h2>
        <div className="location-field">
          <input
            type="text"
            className="location-input"
            value={inputValue}
            onChange={handleChange}
          />
          <button className="location-submit" onClick={handleSubmit}>
            Enter
          </button>
        </div>
        {forecastData && (
          <div className="location">
            <p className="card-content">{forecastData.location.name},{forecastData.location.country}</p>
            <div className="temperature">
              <p>Temp is {forecastData.current.temp_c}</p>
              <p>Max is {forecastData.forecast.forecastday[0].day.maxtemp_c}</p>
              <p>Min is {forecastData.forecast.forecastday[0].day.mintemp_c}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
