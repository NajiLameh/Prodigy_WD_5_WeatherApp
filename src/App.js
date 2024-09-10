import React, { useState, useRef } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const location = useRef(null);
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const loc = location.current.value;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=84c163310b6a587c3700df5af4017196
      `;
      axios.get(url).then((response) => {
        setData(response.data);
      });
      location.current.value = "";
    }
  };

  return (
    <div className="app">
      <div className="title">
        <h3>Prodigy InfoTech Fifth Task - Weather App</h3>
        <hr />
      </div>
      <div className="search">
        <input
          id="location"
          ref={location}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} KM/H</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
