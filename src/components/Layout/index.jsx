import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'
import background from '../../access/images/background.avif'
import Nav from '../Nav'

const index = () => {
  return (
    <div className=" bg-no-repeat bg-center w-full bg-fixed h-[100vh] bg-cover relative "  >
      <div className='' >
        <div className='flex flex-wrap'>
          <div className='w-[70%]'>
            <div><Nav/></div>
            <Outlet />
          </div>
          <div className='w-[30%] bg-[rgb(41,64,93)]' >
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default index