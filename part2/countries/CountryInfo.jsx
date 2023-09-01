import { useEffect, useState } from "react";
import axios from "axios";
import fetchService from "./fetchService";
import WeatherResults from "./WeatherResults";

export default function CountryInfo({ country }) {
  const { name, capital, area, languages, flag, latlng, ...rest } = country;

  const languageList = Object.values(languages);
  const langListArr = [];
  for (let i = 0; i < languageList.length; i++) {
    langListArr.push(languageList[i]);
  }
  const langList = langListArr.map((lang) => <li key={lang}>{lang}</li>);
  const [temperature, setTemperature] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latlng[0]}&longitude=${latlng[1]}&hourly=temperature_2m`
      )
      .then((response) => {
        const apiResponse = response.data;
        setTemperature(apiResponse.hourly.temperature_2m[0]);
      })
      .catch((error) => {
        console.log("FFFFFUUUUUCK!!!");
      });
  }, []);

  return (
    <div className="countryInfoContainer">
      <h2>
        <span className="flag">{flag}</span> {name.common}
      </h2>
      <div className="countryInfo">
        <h3>Capital</h3>
        <li>{capital}</li>
        <h3>Area</h3>
        <li>
          {area} <span className="areaSmall">km</span>
          <sup>2</sup>
        </li>
        <h3>Languages</h3>
        {langList}
        <h3>Current Weather in {capital}</h3>
        <WeatherResults temperature={temperature} />
      </div>
    </div>
  );
}
