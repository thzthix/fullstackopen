import { useState, useEffect } from "react";
import axios from "axios";
import CountryForm from "./Components/CountryForm";
import FilteredCountries from "./Components/FilteredCounties";

const API_KEY = process.env.REACT_APP_API_KEY;
function App() {
  const [countries, setCountries] = useState([]);
  const [serachValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(
          response.data.map(
            ({
              name: { common },
              capital,
              area,
              languages,
              flags: { png },
              latlng: [lan, lon],
            }) => {
              return {
                name: common,
                capital,
                area,
                languages,
                lan,
                lon,
                flag: png,
                isShown: false,
              };
            }
          )
        );
      });
  }, []);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleShow = (name) => {
    const countryToShow = countries.find((country) => country.name === name);

    if (!countryToShow.isShown) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${countryToShow.lan}&lon=${countryToShow.lon}&appid=${API_KEY}&units=metric`
        )
        .then((res) => {
          const changedCountryToShow = {
            ...countryToShow,
            isShown: !countryToShow.isShown,
            weather: {
              weatherMain: res.data.weather[0].main,
              weatherDetail: res.data.weather[0].description,
              icon: res.data.weather[0].icon,
              temp: res.data.main.temp,
              wind: res.data.wind.speed,
            },
          };
          setCountries(
            countries.map((country) =>
              country.name !== name ? country : changedCountryToShow
            )
          );
        });
    } else {
      const changedCountryToShow = {
        ...countryToShow,
        isShown: !countryToShow.isShown,
      };
      setCountries(
        countries.map((country) =>
          country.name !== name ? country : changedCountryToShow
        )
      );
    }
  };
  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(serachValue.toLowerCase())
  );
  return (
    <div>
      <CountryForm onChange={handleChange} serachValue={serachValue} />

      <FilteredCountries
        countriesToShow={countriesToShow}
        handleShow={handleShow}
      />
    </div>
  );
}

export default App;
