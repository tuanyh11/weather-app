import React from 'react'
import CardWeather from '../components/WeatherCard'
import { connect } from 'react-redux'
import { RiSunLine, RiWindyFill, RiSunFoggyLine, RiHazeLine, RiThermometerLine, RiWaterFlashFill, RiGpsLine } from 'react-icons/ri'

const rederBody = (content) => (
  <div>
    {content.map((item, i) => {
      return (
        <div key={i} className="flex items-center pt-4">
          {item.icon}
          <p className="ml-4 text-3xl text-main">{item.value}{item.unit && item.unit}</p>
        </div>
      )
    })}
  </div>
)

const Today = ({ weatherData }) => {
  return (
    <div>
      <div className='text-start py-5'>
        <h1 className='text-main text-xl font-medium'>Today overview</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 auto-rows-fr">
        {weatherData.map((card, i) => {
          return <CardWeather key={i} body={() => rederBody(card.content)} heading={card.heading} />
        })}

      </div>
    </div>
  )
}

const mapStateToProp = (state) => {
  const weather = state.data.weather?.current
  if (weather)
    return {
      weatherData: [
        {
          heading: 'UV index',
          content: [
            {
              unit: null,
              icon: <RiSunLine className="text-[#6084DB] w-8 h-8" />,
              value: weather.uvi
            }
          ]
        },
        {
          heading: 'wind speed',
          content: [
            {
              unit: 'km/h',
              icon: <RiWindyFill className="text-[#6084DB] w-8 h-8" />,
              value: weather.wind_speed
            }
          ]
        },
        {
          heading: 'sunride & sunset',
          content: [
            {
              unit: null,
              icon: <RiSunFoggyLine className="text-[#6084DB] w-8 h-8" />,
              value: new Date(weather.sunrise * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            },
            {
              unit: null,
              icon: <RiHazeLine className="text-[#6084DB] w-8 h-8" />,
              value:  new Date(weather.sunset * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            }
          ]
        },
        {
          heading: 'visibility',
          content: [
            {
              unit: 'km',
              icon: <RiGpsLine  className="text-[#6084DB] w-8 h-8"/>,
              value: weather.humidity
            }
          ]
        },
        {
          heading: 'humidity',
          content: [
            {
              unit: '%',
              icon: <RiWaterFlashFill className="text-[#6084DB] w-8 h-8" />,
              value: weather.humidity
            }
          ]
        },
        {
          heading: 'pressure',
          content: [
            {
              unit: null,
              icon: <RiThermometerLine  className="text-[#6084DB] w-8 h-8" />,
              value: weather.pressure
            }
          ]
        }
      ]
    }
  else return { weatherData: [] }
}

export default connect(mapStateToProp)(Today)