import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

const key = "6343f7fec7c83e6204d7dc8c7c0b7f14";

function App() {
  const [weather, setweather] = useState();
  const [coords, setCoords] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const success = (pos) => {
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const { lat, lon } = coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
      axios
        .get(url)
        .then((res) => {
          const kel = res.data.main.temp;
          const cel = (kel - 273.15).toFixed(2);
          const fah = ((cel * 9) / 5 + 32).toFixed(2);
          setTemp({ cel: cel, fah: fah });
          setweather(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    }
  }, [coords]);

  return (
    <>
      <div className="app">
        {isLoading ? (
          <figure className="app__img">
            <img src="../loading weather.gif" alt="is loading ..." />
          </figure>
        ) : (
          <WeatherCard weather={weather} temp={temp} />
        )}
      </div>
    </>
  );
}

export default App;
