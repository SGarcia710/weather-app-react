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
        <h1 id='weather-location' className='h3'></h1>
        <h3 id='weather-description' className='h4'></h3>
        <h3 id='weather-string'></h3>
        <ul className='list-group mt-3'>
          <li id='weather-humidity' className='list-group-item'></li>
          <li id='weather-wind' className='list-group-item'></li>
        </ul>
      </div>
    </div>
  ) : (
    <h1>Wrong search</h1>
  );
export default WeatherInfo;
