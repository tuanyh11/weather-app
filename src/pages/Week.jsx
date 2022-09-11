import React, { useEffect, useState } from 'react'
import CardWeather from '../components/WeatherCard'
import { connect } from 'react-redux'
import { getDate } from '../unit'
import Title from '../components/Title'


const renderBody = (card) => {
  const icon = card?.weather[0]?.icon
  const min = Math.round(card?.temp?.min - 273)
  const max = Math.round(card?.temp?.max - 273)
  return (
    <div className='flex items-center justify-center flex-col '>
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        <div>
          <span className='font-medium text-lg'>{min}&#176;</span>
          <span className='font-medium text-lg'> - </span>
          <span className='font-medium text-lg'>{max}&#176;</span>
        </div>
    </div>
  )
}


const initialWeater = {
  id: '',
  tempCurrent: '',
  humidity: '',
  windSpeed: '',
  min: '',
  max: '',
  sunrise: '',
  sunset: '',
  description: '',
  pressure: ''
}

const Week = ({weekWeatherData}) => {
  const [currentWeather, setCurrentWeather] = useState(initialWeater);

  const handleSetWeather = (weather) => {
    const data = {
      id: weather.id,
      tempCurrent: Math.round(weather.temp.day - 273),
      humidity: weather.humidity,
      windSpeed: weather.wind_speed,
      min: Math.round(weather.temp.min - 273),
      max: Math.round(weather.temp.max - 273),
      sunrise: getDate(weather.sunrise, { hour: 'numeric', minute: 'numeric', hour12: true }),
      sunset: getDate(weather.sunset, { hour: 'numeric', minute: 'numeric', hour12: true }),
      description: weather.weather[0].description,
      pressure: weather.pressure
    }
    setCurrentWeather(data)
  }

  useEffect(() => {
    if(weekWeatherData.length > 0) {
      handleSetWeather({...weekWeatherData[0], id: 0})
    }
  }, [weekWeatherData])
 
  return (
    <div>
      <Title title={'Week'}/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr">
        {weekWeatherData.map((weather, i) => {
          const date = getDate(weather.dt, {weekday:'short', month: 'numeric', day: 'numeric', year: 'numeric' })
          return <CardWeather key={i} body={() => renderBody(weather)} handleOnclick={() => handleSetWeather({...weather, id: i})}  hover={true}  heading={date} active={currentWeather.id === i}/>
        })}
      </div>
      {currentWeather && (
        <div className='mt-10 '>
          <div className="grid grid-cols-1 md:grid-cols-2 bg-white p-5 text-start text-slate-500 rounded-md">
            <div>
              <p className="text-lg py-2">Temp: <span className="text-main text-2xl font-medium" dangerouslySetInnerHTML={{__html: `${currentWeather.min}&#8451; - ${currentWeather.max}&#8451;`}} /></p>
              <p className="text-lg py-2">Humidity: <span className="text-main text-2xl font-medium">{currentWeather.humidity} &#x25;</span></p>
              <p className="text-lg py-2">Wind Speed: <span className="text-main text-2xl font-medium">{currentWeather.windSpeed} km/h</span></p>
              <p className="text-lg py-2">Temp current: <span className="text-main text-2xl font-medium">{currentWeather.tempCurrent}&#8451;</span></p>
            </div>
            <div>
              <p className="text-lg py-2">Sunrise: <span className="text-main text-2xl font-medium">{currentWeather.sunrise}</span></p>
              <p className="text-lg py-2">Sunset: <span className="text-main text-2xl font-medium">{currentWeather.sunset}</span></p>
              <p className="text-lg py-2">Description: <span className="text-main text-2xl font-medium">{currentWeather.description}</span></p>
              <p className="text-lg py-2">Atmostpheric Pressure: <span className="text-main text-2xl font-medium">{currentWeather.pressure} hpa</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProp = (state) => {
  return {
    weekWeatherData: state.data.weather?.daily ? state.data.weather.daily : []
  }
}

 
export default connect(mapStateToProp)(Week)