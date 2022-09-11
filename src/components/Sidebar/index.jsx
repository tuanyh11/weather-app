import React, { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks';
import Search from '../Search';
import { connect } from 'react-redux';
import {
  clearCityData,
  getCity,
  getWeather,
  searchCities,
  setCurrentCity,
} from '../../redux/actions';
import Dropdown from '../Dropdown';
import WeatherDetail from './WeatherDetail';
import { getDate } from '../../unit';

const Sidebar = ({
  city,
  isFetching,
  weather,
  handleGetCity,
  handleSearchCities,
  handleGetWeather,
  handleClearCity,
  currentCity,
}) => {
  const [text, setText] = useState('');

  const defaultLocation = JSON.parse(localStorage.getItem('cities'));

  const value = useDebounce(text, 500);
  useEffect(() => {
    if (!value.trim()) {
      handleClearCity();
      return;
    }
    handleSearchCities(value);
  }, [value]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      handleGetWeather({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      handleGetCity({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  const handleSetValue = (value) => {
    handleGetWeather(value);
    setText('');
  };


  return (
    <div className=" shadow h-full px-8 py-8  flex flex-col">
      <div>
        <Search
          value={text}
          onChange={(valueInput) => setText(valueInput)}
          placeholder={'Search Location'}
          isSpining={isFetching}
        />
        <div className="relative">
          <div
            className={` absolute top-[10%] overflow-auto max-h-0 transition-all duration-300 ease-linear left-0 right-0 z-10 bg-slate-500 ${
              city?.length !== 0 ? 'max-h-40' : ''
            }`}
          >
            <Dropdown data={city} handleClick={handleSetValue} />
          </div>
        </div>
      </div>

      {/* default location */}

      <ul className="mt-8 text-start">
        {defaultLocation.map((item, i) => (
          <li
            onClick={() => handleSetValue(item)}
            className={`text-[#ccc] capitalize text-lg  py-5 hover:text-white ${
              text.toLowerCase() === item.name.toLowerCase()
                ? '!text-white'
                : ''
            } cursor-pointer transition`}
            key={i}
          >
            {item.name}
          </li>
        ))}
      </ul>


        <div className='border-t-[1px] border-t-[#fff] pt-10 text-[#fff] flex-1 flex flex-col '>
          <div className="text-start">
            <h2 className="text-xl text-middle text-white">Weather Details</h2>
          </div> 
          { currentCity && weather &&  (
            <div className="text-center mt-auto mb-auto">
              <WeatherDetail
                cityName={currentCity?.name}
                images={`http://openweathermap.org/img/wn/${weather?.current?.weather[0]?.icon}@2x.png`}
                temp={Math.round(weather?.current?.temp - 273)}
                date={getDate(weather?.current?.dt, {hour: 'numeric', minute: 'numeric'})}
                clouds={weather?.current?.clouds}
                description={weather?.current?.weather[0].description}
              />
            </div>
          )}
        </div>
    </div>
  );
};

const mapStateToProp = (state) => ({
  city: state.data.city,
  weather: state.data.weather,
  isFetching: state.data.isFetching,
  currentCity: state.data.currentCity,
});
const mapDispatchToProp = (dispatch) => {
  return {
    handleSearchCities(value) {
      dispatch(searchCities(value));
    },
    handleGetCity(value) {
      dispatch(getCity(value));
    },
    handleGetWeather(value) {
      dispatch(getWeather(value));
      dispatch(setCurrentCity(value));
    },
    handleClearCity() {
      dispatch(clearCityData());
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Sidebar);
