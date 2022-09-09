import React from 'react'
import CardWeather from '../components/WeatherCard'
import { connect } from 'react-redux'

const renderBody = (card) => {
  const icon = card?.weather[0]?.icon
  const min = Math.round(card?.temp?.min - 273)
  const max = Math.round(card?.temp?.max - 273)
  return (
    <div className='flex items-center justify-center flex-col'>
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        <div>
          <span>{min}&#176;</span>
          <span> - </span>
          <span>{max}&#176;</span>
        </div>
    </div>
  )
}

const Week = ({weekWeatherData}) => {
  return (
    <div>
      <div className='text-start py-5'>
        <h1 className='text-main text-xl font-medium'>Today overview</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 auto-rows-fr">
        {weekWeatherData.map((card, i) => {
          const date = new Date(card.dt * 1000).toLocaleString('en-US', {weekday:'short', month: 'numeric', day: 'numeric', year: 'numeric' })
          return <CardWeather key={i} body={() => renderBody(card)}  heading={date} />
        })}

      </div>
    </div>
  )
}

const mapStateToProp = (state) => {
  return {
    weekWeatherData: state.data.weather?.daily
  }
}

export default connect(mapStateToProp)(Week)