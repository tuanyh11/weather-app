import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import routes from '../../routes'
import Search from '../Search'
import Dropdown from '../Dropdown'
import { useDebounce } from '../../hooks'
import {connect} from 'react-redux'
import {clearCityData, getCity, getWeather, searchCities, setCurrentCity} from '../../redux/actions'

const Nav = ({city,  isFetching, weather, handleGetCity, handleSearchCities, handleGetWeather, handleClearCity, currentCity}) => {
  const [text, setText] = useState('')  

  const value = useDebounce(text, 500) 
  useEffect(() => {
    if(!value.trim()) {
      handleClearCity()
      return
    }
    handleSearchCities(value)
  }, [value])

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(position => {
      handleGetWeather({lat: position.coords.latitude, lon: position.coords.longitude})
      handleGetCity({lat: position.coords.latitude, lon: position.coords.longitude})
    })
  }, [])

  const handleSetValue =(value) => {
    handleGetWeather(value)
    setText('')
  }

  return (
    <div className="p-5 shadow bg-white flex items-center justify-between ">
      <ul className='flex items-center'>
        {routes.map((route, i) => 
          <li key={i} className="capitalize p-2 lg:p-4 text-main font-medium text-lg ">
            <NavLink to={route.path} >{route.name}</NavLink>
          </li>
        )}
      
      </ul>
      <div className='lg:hidden'> 
        <div className="flex-1 w-[200px] lg:w-auto"><Search  value={text} onChange={(valueInput) => setText(valueInput)} placeholder={'Search Location'} isSpining={isFetching} className="!text-slate-900 focus:!border-slate-700"/></div>
        <div className="relative">
            <div className={` absolute top-[10%] overflow-auto max-h-0 transition-all duration-300 ease-linear left-0 right-0 z-10 bg-slate-500 ${city?.length !== 0  ? 'max-h-40': ''}`}>
              <Dropdown data={city} handleClick={handleSetValue} />
            </div>
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
    handleSearchCities(value) {
      console.log(value)
      dispatch(searchCities(value))
    },
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


export default connect(mapStateToProp, mapDispatchToProp)(Nav)