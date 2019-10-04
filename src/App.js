import React, { useEffect, useState } from 'react';
import './App.css';
import WeatherInfo from './components/WeatherInfo';

const App = () => {
  // estado para la información del clima
  const [weatherInfo, setWeatherInfo] = useState({
    code: '',
    temp: '',
    humidity: '',
    name: '',
    country: '',
    weatherDesc: '',
    windSpeed: ''
  });
  // Estado para la información de búsqueda
  const [query, setQuery] = useState({ city: 'cali', countryCode: 'co' });

  useEffect(() => {
    getData();
  }, [query]);

  const getData = async () => {
    // Hacemos un request a la API con los datos seleccionados
    const response = await fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?id=2172797&lang=en&units=metric&mode=xml%2C%20html&q=${query.city}%2C${query.countryCode}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': '50b348b789mshc5e5fc6ede0488cp1b6fe1jsne7b277a7800b'
        }
      }
    );
    // Convertimos la promesa recibida a un objeto JSON
    const json = await response.json();
    // Verficamos si la solicitud fue hecha con una ciudad y/o pais validos
    if (json.cod === 200) {
      // de ser correcta la solicitud, procedemos a extraer los datos de interés de la respuesta del servidor
      const {
        cod,
        main: { temp, humidity },
        name,
        sys: { country },
        weather,
        wind: { speed }
      } = json;
      // construimos el objeto a guardar en nuestro estado
      const object = {
        code: cod,
        temp: temp,
        humidity: humidity,
        name: name,
        country: country,
        weatherDesc: weather[0].description,
        windSpeed: speed
      };
      // Establecemos nuestro nuevo estado
      setWeatherInfo(object);
    } else {
      // De no ser valida la busqueda, solamente guardamos el código
      const { cod } = json;
      // Creamos el objeto a guardar en nuestro estado
      const object = {
        code: cod
      };
      // Establecemos nuestro nuevo estado
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
          {/* Uso mi Componente */}
          <WeatherInfo {...weatherInfo} />
          <div className='card'>
            <div className='card-body'>
              <form onSubmit={getSearchTerms}>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='City'
                    name='city'
                    autoFocus
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Country Code'
                    name='countryCode'
                    maxLength='3'
                    required
                  />
                </div>
                <div className='form-group'>
                  <button type='submit' className='btn btn-primary btn-block'>
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
