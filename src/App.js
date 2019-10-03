import React, { useEffect, useState } from 'react';
import './App.css';
import WeatherInfo from './components/WeatherInfo';

const App = () => {
  const [weatherInfo, setWeatherInfo] = useState({
    code: '',
    temp: '',
    humidity: '',
    name: '',
    country: '',
    weatherDesc: '',
    windSpeed: ''
  });

  const [query, setQuery] = useState({ city: 'cali', countryCode: 'co' });

  useEffect(() => {
    getData();
  }, [query]);

  const getData = async () => {
    const response = await fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?id=2172797&lang=en&units=metric&mode=xml%2C%20html&q=${query.city}%2C${query.countryCode}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': '50b348b789mshc5e5fc6ede0488cp1b6fe1jsne7b277a7800b'
        }
      }
    ).catch();
    // Free OpenWeatherAPI account Sgarcia710 - 60 calls per minute
    //`https://api.openweathermap.org/data/2.5/weather?q=${query.city},${query.countryCode}&appid=801685f9e6f8de87e464e193e808b4ed`
    const json = await response.json();
    if (json.cod === 200) {
      // City found
      const {
        cod,
        main: { temp, humidity },
        name,
        sys: { country },
        weather,
        wind: { speed }
      } = json;
      const object = {
        code: cod,
        temp: temp,
        humidity: humidity,
        name: name,
        country: country,
        weatherDesc: weather[0].description,
        windSpeed: speed
      };
      setWeatherInfo(object);
    } else {
      // City not found
      const { cod } = json;
      const object = {
        code: cod
      };
      setWeatherInfo(object);
    }
  };

  const getSearchTerms = e => {
    e.preventDefault();
    const object = {
      city: e.target.city.value,
      countryCode: e.target.countryCode.value
    };
    setQuery(object);
    e.target.city.value = '';
    e.target.countryCode.value = '';
  };

  return (
    <div className='container p-4'>
      <div className='row'>
        <div className='col-md-4 mx-auto text-center'>
          <WeatherInfo
            code={weatherInfo.code}
            temp={weatherInfo.temp}
            humidity={weatherInfo.humidity}
            name={weatherInfo.name}
            country={weatherInfo.country}
            weatherDesc={weatherInfo.weatherDesc}
            windSpeed={weatherInfo.windSpeed}
          />
          <div className='card'>
            <div className='card-body'>
              <form action='' id='w-form' onSubmit={getSearchTerms}>
                <div className='form-group'>
                  <input
                    type='text'
                    id='city'
                    className='form-control'
                    placeholder='City'
                    name='city'
                    autoFocus
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Country Code'
                    name='countryCode'
                    required
                    id='countryCode'
                    maxLength='3'
                    className='form-control'
                  />
                </div>
                <div className='form-group'>
                  <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    id='w-change-btn'
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
