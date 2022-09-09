import React from 'react'
import { FaSpinner, FaTimes } from 'react-icons/fa'

const index = ({value, onChange, placeholder,isSpining}) => {
  return (
    <div className='flex items-center relative'>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className='w-full outline-0 border-b-[#ccc] focus:border-b-[#fff] border-b-[1px] text-white text-base  py-2 bg-transparent'/>

      <div className="flex text-[#ccc] items-center absolute top-[50%] right-[0] translate-y-[-50%] ">
        {isSpining ? <FaSpinner className='spining w-4 h-4'/> : <FaTimes onClick={() => onChange('')} className=' w-4 h-4 cursor-pointer'/>} 
      </div>
    </div>
  )
}

export default index