import Country from "./Country";
const FilteredCountries = ({ countriesToShow, handleShow }) => {
  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countriesToShow.length === 0) {
    return <p>Nothing matched</p>;
  } else if (countriesToShow.length === 1) {
    const country = countriesToShow[0];
    return (
      <Country
        name={country.name}
        capital={country.capital}
        area={country.area}
        languages={country.languages}
        flag={country.flag}
        weather={country.weather}
      />
    );
  }
  return (
    <ul>
      {countriesToShow.map((country) => (
        <li key={country.name}>
          {country.name}{" "}
          <button
            onClick={() => {
              handleShow(country.name);
            }}
          >
            {!country.isShown ? "show" : "hide"}
          </button>
          {country.isShown ? (
            <Country
              name={country.name}
              capital={country.capital}
              area={country.area}
              languages={country.languages}
              flag={country.flag}
              weather={country.weather}
            />
          ) : (
            ""
          )}
        </li>
      ))}
    </ul>
  );
};
export default FilteredCountries;
