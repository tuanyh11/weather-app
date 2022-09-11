import React from 'react'
import { getDate } from '../../unit'

const WeatherDetail = ({cityName, images, temp, date, clouds, description}) => {
  return (
    <div>
        {
           
            <>
            <div className='flex items-center mt-2 justify-center'>
                <img className="w-[90px]" src={images} alt="" />
                <p className="text-4xl ml-4">{cityName}</p>
            </div>
            <div children="text-start">
                <p className="text-[100px]">{temp} <span>&#8451;</span></p>
            </div>
            <div className="text-lg">{date}</div>
            <div className="flex justify-center mt-2">
                <span className="mr-2">Clouds: </span>
                <p>{clouds} &#37;</p>
                </div>
            <div className="flex justify-center  mt-2 capitalize">
                <p>{description}</p>
            </div>
            </>
        }
    </div>
  )
}

export default WeatherDetail