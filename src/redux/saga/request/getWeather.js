
import  { getWeatherDetail } from './../../../api/index';
const getWeather = (city) => {
  return getWeatherDetail(city)
            .then(response => ({response}))
            .catch(error => ({error}))
}

export default getWeather

// https://api.openweathermap.org/data/2.5/onecall?lat=21.0245&lon=105.8412&units=metric&appid=ac2e59088cbe65dddd76cc799a3f7efb