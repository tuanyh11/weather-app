import React from 'react'

const Title = ({title}) => {
  return (
    <div className='text-start p-5 px-7 lg:px-0'>
        <h1 className=' text-xl font-medium text-main'>{title}</h1>
    </div>
  )
}

export default Title