import React from 'react';

const WeatherInfo = ({
  code,
  temp,
  humidity,
  name,
  country,
  weatherDesc,
  windSpeed
}) =>
  code === 200 ? (
    <div className='card mb-3'>
      <div className='card-body'>
        <h1 id='weather-location' className='h3'>
          {name} / {country}
        </h1>
        <h3 id='weather-description' className='h4'>
          {weatherDesc}
        </h3>
        <h3 id='weather-string'>{temp}°C</h3>
        <ul className='list-group mt-3'>
          <li id='weather-humidity' className='list-group-item'>
            Humidity: {humidity}°
          </li>
          <li id='weather-wind' className='list-group-item'>
            Wind speed: {windSpeed}m/s
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <div className='card mb-3'>
      <div className='card-body'>
        <h1 className='h3'>Wrong search</h1>
        <h6 className='h6'>Try again</h6>
      </div>
    </div>
  );

export default WeatherInfo;
