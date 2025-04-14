import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className='text-gray-500'>{text1} <span className='font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-600'>{text2}</span></p>
      <div className='w-8 sm:w-12 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full'></div>
    </div>
  )
}

export default Title
