import React from 'react'
import CardWeather from '../components/WeatherCard'
import { connect } from 'react-redux'
import { RiSunLine, RiWindyFill, RiSunFoggyLine, RiHazeLine, RiThermometerLine, RiWaterFlashFill, RiGpsLine } from 'react-icons/ri'
import { useDate } from '../hooks'
import { getDate } from '../unit'
import HourCard from '../components/WeatherCard/HourCard'
import Slider from 'react-slick'
import WeatherDetail from '../components/Sidebar/WeatherDetail'
import Title from '../components/Title'


const rederBody = (content) => (
  <div>
    {content.map((item, i) => {
      return (
        <div key={i} className="flex items-center justify-center pt-4">
          {item.icon}
          <p className="ml-4 text-3xl text-main">{item.value}{item.unit && item.unit}</p>
        </div>
      )
    })}
  </div>
)

const Today = ({ cunrrentWeather, hourlyWeather, weather, currentCity }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const currentHour = getDate(Math.floor(Date.now() / 1000),{hour: 'numeric'})

  return (
    <div>
      <Title title={'Today'}/>
      <div className='border-t-[1px] bg-white p-10 text-main flex-1 flex flex-col lg:hidden mb-10'>
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
      <div className="">
        <Slider {...settings}>
          {hourlyWeather?.map((item, i) => {
            const time = getDate(item.dt, { hour: 'numeric', minute: 'numeric', hour12: true })
            const icon = item.weather[0].icon
            const temp = Math.round(item.temp - 273)
            const active = currentHour === getDate(item.dt, {hour: 'numeric'})
            return <div key={i} className='px-2'><HourCard  time={time} icon={icon} temp={temp} active={active}/></div>
          })}
        </Slider>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr mt-10">
        {cunrrentWeather.map((card, i) => {

          return <CardWeather key={i} body={() => rederBody(card.content)} heading={card.heading}/>
        })}

      </div>

    </div>
  )
}

const mapStateToProp = (state) => {
  const cunrrentWeather = state.data.weather?.current
  const hourlyWeather = state.data.weather?.hourly
  if (cunrrentWeather && hourlyWeather)
    return {
      cunrrentWeather: [
        {
          heading: 'UV index',
          content: [
            {
              unit: null,
              icon: <RiSunLine className="text-[#6084DB] w-8 h-8" />,
              value: cunrrentWeather.uvi
            }
          ]
        },
        {
          heading: 'wind speed',
          content: [
            {
              unit: 'km/h',
              icon: <RiWindyFill className="text-[#6084DB] w-8 h-8" />,
              value: cunrrentWeather.wind_speed
            }
          ]
        },
        {
          heading: 'sunride & sunset',
          content: [
            {
              unit: null,
              icon: <RiSunFoggyLine className="text-[#6084DB] w-8 h-8" />,
              value: getDate(cunrrentWeather.sunrise, { hour: 'numeric', minute: 'numeric', hour12: true })
            },
            {
              unit: null,
              icon: <RiHazeLine className="text-[#6084DB] w-8 h-8" />,
              value:  getDate(cunrrentWeather.sunset, { hour: 'numeric', minute: 'numeric', hour12: true })
            }
          ]
        },
        {
          heading: 'visibility',
          content: [
            {
              unit: 'km',
              icon: <RiGpsLine  className="text-[#6084DB] w-8 h-8"/>,
              value: cunrrentWeather.humidity
            }
          ]
        },
        {
          heading: 'humidity',
          content: [
            {
              unit: '%',
              icon: <RiWaterFlashFill className="text-[#6084DB] w-8 h-8" />,
              value: cunrrentWeather.humidity
            }
          ]
        },
        {
          heading: 'pressure',
          content: [
            {
              unit: null,
              icon: <RiThermometerLine  className="text-[#6084DB] w-8 h-8" />,
              value: cunrrentWeather.pressure
            }
          ]
        }
      ],
      hourlyWeather: hourlyWeather.slice(0, 24),
      weather: state.data.weather,
      isFetching: state.data.isFetching,
      currentCity: state.data.currentCity,
    }
  else return { cunrrentWeather: [], hourlyWeather: [] }
}


export default connect(mapStateToProp)(Today)