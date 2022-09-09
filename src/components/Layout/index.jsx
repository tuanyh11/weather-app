import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'
import background  from '../../access/images/background.avif'

const index = () => {
  return (
    <div  className=" bg-no-repeat bg-center w-full h-[100vh] bg-cover relative before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 before:bg-[rgba(0,0,0,0.2)]" style={{backgroundImage: `url(${background})`}} >
      <div className='' >
        <div className='flex flex-wrap'>
          <div className='w-[70%]'>
            <Outlet/>
          </div>
          <div className='w-[30%] absolute  right-0 top-0 bottom-0'>
            <Sidebar/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index