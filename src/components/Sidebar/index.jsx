import React, { useEffect, useState } from 'react'
import { useDebounce } from '../../hooks'
import Search from '../Search'
import {connect} from 'react-redux'
import {getCity, getWeather} from '../../redux/actions'
import {useDispatch} from 'react-redux'
import Dropdown from '../Dropdown'

const Sidebar = ({data, handleGetCity, handleGetWeather}) => {
  const [text, setText] = useState('Ha Noi')  

  const value = useDebounce(text, 1000) 
  useEffect(() => {
    if(value.trim()) handleGetCity(value)
  }, [value])
  return (
    <div className='shadow h-[100vh] p-5' >
      <div> 
        <Search value={text} onChange={(e) => setText(e.target.value)}/>
      </div>
      <div>
        {data.city?.length !== 0 &&
          <Dropdown data={data.city} handleClick={handleGetWeather} />
        }
      </div>
    </div>
  )
}

const mapStateToProp = (state) => ({data: state.data})
const mapDispatchToProp = (dispatch) => {
  return {
    handleGetCity(value) {
      dispatch(getCity(value))
    },
    handleGetWeather(value) {
      dispatch(getWeather(value))
    }
  }
}

export default connect(mapStateToProp, mapDispatchToProp)(Sidebar)