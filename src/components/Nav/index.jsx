import React from 'react'
import { NavLink } from 'react-router-dom'
import routes from '../../routes'

const Nav = () => {
  return (
    <div>
      <ul className='flex justify-center'>
        {routes.map((route, i) => 
          <li key={i} className="capitalize p-4 text-[#0D2442] font-medium text-lg">
            <NavLink to={route.path} >{route.name}</NavLink>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Nav