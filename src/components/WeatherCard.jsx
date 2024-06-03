import React, { useState } from "react";
import "./assets/WeatherCard.css";

const WeatherCard = ({ weather, temp }) => {
  const [isCel, setIsCel] = useState(true);
  const handleTemp = () => {
    setIsCel(!isCel);
  };
  return (
    <div className="weatherCard">
      <h1 className="weatherCard__header">weather app</h1>
      <h2 className="weatherCard__location">
        {weather?.name}, {weather?.sys.country}
      </h2>
      <section className="weatherCard__container">
        <figure className="weatherCard__img">
          <img
            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}
            alt="weather image"
          />
        </figure>
        <article className="weatherCard__details">
          <h3 className="weatherCard__description">
            "{weather?.weather[0].description}"
          </h3>
          <ul className="weatherCard__list">
            <li className="weatherCard__item">
              <span>Wind Speed</span>
              <span>{weather?.wind.speed} m/s</span>
            </li>
            <li className="weatherCard__item">
              <span>Clouds</span>
              <span>{weather?.clouds.all} %</span>
            </li>
            <li className="weatherCard__item">
              <span>Pressure</span>
              <span>{weather?.main.pressure} hPa</span>
            </li>
          </ul>
        </article>
      </section>
      <h2 className="weatherCard__temp">
        {isCel ? temp?.cel + " ºC" : temp?.fah + " ºF"}
      </h2>
      <button onClick={handleTemp} className="weatherCard__btn">
        Change to {isCel ? "ºF" : "ºC"}
      </button>
    </div>
  );
};

export default WeatherCard;
