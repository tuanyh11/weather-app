import React from 'react'

const DropdownItem = ({value, handleClick}) => {
  return (
    <div onClick={() => handleClick(value)}>
        {value?.name}
    </div>
  )
}

export default DropdownItem