import React, { useEffect, useState } from 'react'
import { useDebounce } from '../../hooks'
import Search from '../Search'
import {connect} from 'react-redux'
import {clearCityData, getCity, getWeather, setCurrentCity} from '../../redux/actions'
import Dropdown from '../Dropdown'

const defaultLocation = [
  {
    name: 'Thai Nguyen',
    lat:21.592477,
    lon:105.8435398,
  },
  {
    name: 'Ha Noi',
    lat:21.0294498,
    lon:105.8544441
  },
  {
    name: 'Tuyen Quang',
    lat:21.7879695,
    lon:105.217387
  },
  {
    name: 'Da nang',
    lat:16.068,
    lon:108.212
  },
  {
    name: 'Ho Chi Minh City',
    lat:10.7758439,
    lon:106.7017555
  }
]

const getDate = (time) => {
  const date = new Date(time * 1000).toLocaleString('en-US', {weekday:'long', hour: 'numeric', minute: 'numeric', hour12: true })
  return date
}


const Sidebar = ({city,  isFetching, weather, handleGetCity, handleGetWeather, handleClearCity, currentCity}) => {
  const [text, setText] = useState('Ha Noi')  
  
  const value = useDebounce(text, 500) 
  useEffect(() => {
    if(!value.trim()) {
      handleClearCity()
      return
    }
    handleGetCity(value)
  }, [value])

  useEffect(() => {
    handleGetWeather(defaultLocation[0])
  }, [])

  const handleSetValue =(value) => {
    handleGetWeather(value)
    setText(value.name)
  }

  console.log(weather)

  const icon = weather?.current?.weather[0]?.icon

  return (
    <div className='shadow h-full px-8 py-8 bg-[rgba(110,110,110,0.25)]' >
      <div> 
        <Search value={text} onChange={(valueInput) => setText(valueInput)} placeholder={'Search Location'} isSpining={isFetching}/>
      </div>
      <div>
        {city?.length !== 0 &&
          <Dropdown data={city} handleClick={handleSetValue} />
        }
      </div>
      
      {/* default location */}
        
      <ul className='mt-8 text-start'>
        {defaultLocation.map((item, i) => 
          <li onClick={() => handleSetValue(item)} className={`text-[#ccc] capitalize text-lg  py-5 hover:text-white ${text.toLowerCase() === item.name.toLowerCase() ? '!text-white': ''} cursor-pointer transition`} key={i}>{item.name}</li>
        )}
      </ul>

      <div className='border-t-[1px] border-t-[#fff] pt-10'>
          <div className="text-start">
            <h2 className="text-xl text-middle text-white">Weather Details</h2>
          </div>
          <div className="text-center">
            {
              currentCity && weather && 
              <>
                <div className='flex items-center mt-2 justify-center'>
                  <img className="w-[90px]" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
                  <p className="text-4xl ml-4">{currentCity?.name}</p>
                </div>
                <div children="text-start">
                  <p className="text-[100px]">{Math.round(Number(weather?.current?.temp ) - 273)} <span>&#8451;</span></p>
                </div>
                <div className="text-lg">{getDate(weather?.current?.dt)}</div>
                <div className="flex justify-center mt-2">
                    <span className="mr-2">Clouds: </span>
                    <p>{weather?.current?.clouds} &#37;</p>
                  </div>
                <div className="flex justify-center  mt-2 capitalize">
                    <p>{weather?.current?.weather[0].description}</p>
                </div>
              </>
            }
          </div>
      </div>
    </div>
  )
}

const mapStateToProp = (state) => ({
  city: state.data.city,
  weather: state.data.weather,
  isFetching: state.data.isFetching,
  currentCity: state.data.currentCity
})
const mapDispatchToProp = (dispatch) => {
  return {
    handleGetCity(value) {
      dispatch(getCity(value))
    },
    handleGetWeather(value) {
      dispatch(getWeather(value))
      dispatch(setCurrentCity(value))
    },
    handleClearCity() {
      dispatch(clearCityData())
    }
  }
}

export default connect(mapStateToProp, mapDispatchToProp)(Sidebar)