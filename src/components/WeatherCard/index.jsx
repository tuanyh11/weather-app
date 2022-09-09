import React from 'react'

const WeatherItem = ({heading, body}) => {
  return (
    <div className='p-6 bg-[#FCFBFC]'>
        {heading && 
            <div className='capitalize text-slate-500'>{heading}</div>
        }
        {
            body && body()
        }
    </div>
  )
}

export default WeatherItem