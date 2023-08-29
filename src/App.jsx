import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "./App.css";
import WeatherCards from "./components/WeatherCards";
import WeatherHighlights from "./components/WeatherHighlights";
import WeatherFooter from "./components/WeatherFooter";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = "596e2538fdc9961fd0f73c793fd35978";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [showSearchPanel, setShowSearchPanel] = useState(true);
  const [searchCity, setSearchCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [cityOptions, setCityOptions] = useState([
    "Lima",
    "Choluteca",
    "Tegucigalpa",
    "Madrid",
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston"

  ]);

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  console.log("Ancho de pantalla: ", screenWidth);
  console.log("Alto de pantalla: ", screenHeight);

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  useEffect(() => {
    // Obtiene la fecha actual y la formatea
    async function fetchCurrentDate() {
      const response = await fetch(
        `http://worldtimeapi.org/api/timezone/Etc/UTC`
      );
      const data = await response.json();
      const currentDate = new Date(data.utc_datetime);
      const formattedDate = format(currentDate, "EEE, d MMM");
      setCurrentDate(formattedDate);
    }

    fetchCurrentDate();
  }, []);

  const fetchWeatherData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    setWeatherData(data);
    setShowSearchPanel(false);
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const handleSearch = () => {
    setCity(searchCity);
    setShowSearchPanel(false);
  };

  const handleCitySelect = (selectedCity) => {
    setSelectedCity(selectedCity);
    setSearchCity(selectedCity);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const fetchWeatherByCoordinates = async (latitude, longitude) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    setWeatherData(data);
  };
  

  return (
    <div className="weather-app">
      <div className="left-panel">
        {showSearchPanel ? (
          <div className="search-panel">
            <button className="close-btn" onClick={() => setShowSearchPanel(false)}>
              X
            </button>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter city"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="form-control"
                style={{ backgroundColor: "#616475", color: "white" }}
              />
              <button className="btn btn-primary" onClick={handleSearch} style={{ marginLeft:"25px" }}>Search</button>
            </div>
            <div className="select-group">
              <select
                className="form-control"
                value={selectedCity}
                onChange={(e) => handleCitySelect(e.target.value)}
                style={{ backgroundColor: "#616475", color: "white", width: "367px", height: "64px", marginTop:"30px", opacity: "80%" }}
              >
                <option value="">Select a city</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div>
            <div className="botones">
              <button className="boton1" onClick={() => setShowSearchPanel(true)}> Search for Places</button>
              <button className="icono" onClick={getCurrentLocation}>
                <i className="fa-solid fa-location-crosshairs"></i>
              </button>
            </div>
            {weatherData && (
              <div className="barra2">
                <div className="background-panel">
                <img
                  src={`http://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}.png`}
                  alt="Weather Icon"
                />
                </div>
                <h1>{weatherData.list[0].main.temp}°C</h1>
                <h3>{weatherData.list[0].weather[0].description}</h3>
                <p>Today-{currentDate}</p> 
                <p>{weatherData.city.name}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="right-panel">
        <div className="temperature-toggle">
          <button
            onClick={toggleTemperatureUnit}
            className={isCelsius ? "active" : ""}
          >
            C
          </button>
          <button
            onClick={toggleTemperatureUnit}
            className={!isCelsius ? "active" : ""}
          >
            F
          </button>
        </div>
        {weatherData && (
          <div>
            <WeatherCards weatherData={weatherData} />
            <WeatherHighlights weatherData={weatherData} />
            <WeatherFooter />
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;