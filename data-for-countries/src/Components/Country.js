const Country = ({ name, capital, languages, area, flag, weather }) => {
  const languagesName = Object.values(languages);
  return (
    <div>
      <h2>{name}</h2>
      <p>{capital} capital</p>
      <p>{area} area</p>
      <h3>languages:</h3>
      <ul>
        {languagesName.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flag} />
      <h3>Weather in {capital}</h3>
      <p>{weather.weatherMain}</p>
      <p>{weather.weatherDetail}</p>
      <p>temperature {weather.temp} Celcius</p>

      <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
      <p>wind {weather.wind}m/s</p>
    </div>
  );
};
export default Country;
