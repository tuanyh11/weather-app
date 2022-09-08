import React from 'react'

const index = ({value, onChange}) => {
  return (
    <div>
      <input value={value} onChange={onChange} className='outline-0 border border-slate-500 px-3 py-2'/>
    </div>
  )
}

export default index