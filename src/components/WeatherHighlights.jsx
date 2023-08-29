import React from "react";
import WeatherFooter from "./WeatherFooter";

function WeatherHighlights({ weatherData }) {
  return (
    <div className="highlights">
      {weatherData && (
        <div>
          <h2 className="title">Today's Highlights </h2>
          <div className="cuadros">
            <div className="highlight-card large">
              <p>Wind Status</p>
              <h2>{weatherData.list[0].wind.speed} m/s</h2>
            </div>
            <div className="highlight-card large">
              <p>Humidity</p>
              <h2>{weatherData.list[0].main.humidity}%</h2>
            </div>
          </div>
          <div className="cuadros">
            <div className="highlight-card medium">
              <p>Visibility</p>
              <h2>{weatherData.list[0].visibility} miles</h2>
            </div>
            <div className="highlight-card medium">
              <p>Air Pressure</p>
              <h2>{weatherData.list[0].main.pressure} mb</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherHighlights;