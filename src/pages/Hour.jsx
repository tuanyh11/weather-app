import React from 'react'
import { connect } from 'react-redux'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getDate } from '../unit'
import Title from '../components/Title'

const Hour = ({hourData}) => {
  return (
    <div>
      <Title title={'Hour'}/>
      <div className='bg-white p-5 rounded-md'>
        <ResponsiveContainer height='100%' width='100%' aspect={4.0/2.0}>
          <LineChart  width={800} height={600} data={hourData}>
            <Line name='Temp &#8451;' dataKey="temp" stroke='#2196f3' type="monotone" strokeWidth={4}></Line>
            <Line name='Feeks Like &#8451;' dataKey="feels_like" stroke='green' type="monotone" strokeWidth={4}></Line>
            <CartesianGrid stroke="#1f1f1f"/>
            <XAxis dataKey="dt" />
            <YAxis/>
            <Tooltip s/>
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const mapStateToProp = (state) => {
  const hourData = state.data.weather? state.data.weather.hourly.slice(0, 24).map((item) => {
    item = {
      temp: Math.round(item.temp - 273),
      'feels_like': Math.round(item.feels_like - 273),
      dt: getDate(item.dt, { hour: 'numeric', minute: 'numeric', hour12: true })
    } 
    return item
  }) : []
  return {
    hourData
  }
}

export default connect(mapStateToProp)(Hour)