import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'

const index = () => {
  return (
    <div >
      <div className='xl:m-[0_auto] max-w-[1280px]'>
        <div className='flex flex-wrap'>
          <div className='w-[30%]'>
            <Sidebar/>
          </div>
          <div className='w-[70%]'>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index