import React from 'react'
import DropdownItem from './DropdownItem'
 
const Dropdown = ({data = [], handleClick}) => {
  return (
    <div className='shadow'>
        {data.map((item, i) => (
            <DropdownItem  key={i} value={item} handleClick={handleClick}/>
        ))}
    </div>
  )
}

export default Dropdown