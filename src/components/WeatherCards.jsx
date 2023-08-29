import React from "react";

function WeatherCards({ weatherData }) {
  return (
    <div className="weather-cards">
      {weatherData && weatherData.list.slice(1, 6).map((item) => (
        <div key={item.dt} className="weather-card">
          <p>{item.dt_txt}</p>
          <img
            src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <div className="grados">
            <p> {item.main.temp_min}°C</p>
            <p> {item.main.temp_max}°C</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeatherCards;