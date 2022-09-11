import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'
import background from '../../access/images/background.avif'
import Nav from '../Nav'

const index = () => {
  return (
    <div className=" bg-no-repeat bg-center w-full bg-fixed  bg-cover relative "  >
      <div className='' >
        <div>
          <Nav/>
        </div>
        <div className='flex flex-wrap gap-2'>
          <div className='w-[100%] lg:w-[60%] xl:w-[70%] lg:p-10 '>
            <Outlet />
          </div>
          <div className='lg:w-[40%]  xl:w-[30%] hidden lg:block  absolute right-0 top-0 h-[100vh] bg-[rgb(41,64,93)] ' >
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default index