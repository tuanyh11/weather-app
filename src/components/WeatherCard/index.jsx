import React from 'react'

const WeatherItem = ({heading, body, handleOnclick, active, hover = false}) => {
  return (
    <div className={`group p-6 bg-white text-slate-700  ${hover ? 'hover:bg-[rgb(4,176,182)] hover:text-white': ''} cursor-pointer rounded-md transition-all duration-200 ease-linear ${active ? '!bg-[rgb(4,176,182)] !text-white' : ''}`} onClick={() => handleOnclick ? handleOnclick() : null}>
        {heading && 
            <div className={`capitalize font-medium `}>{heading}</div>
        }
        {
            body && body()
        }
    </div>
  )
}

export default WeatherItem