import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-4 text-center py-20'>
      
      <div className='bg-white rounded-lg p-6 hover:shadow-md transition-all duration-300 hover:transform hover:scale-105 flex flex-col items-center'>
        <div className='w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 mb-5'>
          <img src={assets.exchange_icon} className='w-8 h-8' alt="Exchange" />
        </div>
        <p className='font-medium text-lg text-gray-800 mb-2'>Easy Exchange Policy</p>
        <p className='text-gray-600'>We offer hassle free exchange policy</p>
      </div>
      
      <div className='bg-white rounded-lg p-6 hover:shadow-md transition-all duration-300 hover:transform hover:scale-105 flex flex-col items-center'>
        <div className='w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 mb-5'>
          <img src={assets.quality_icon} className='w-8 h-8' alt="Quality" />
        </div>
        <p className='font-medium text-lg text-gray-800 mb-2'>7 Days Return Policy</p>
        <p className='text-gray-600'>We provide 7 days free return policy</p>
      </div>
      
      <div className='bg-white rounded-lg p-6 hover:shadow-md transition-all duration-300 hover:transform hover:scale-105 flex flex-col items-center'>
        <div className='w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 mb-5'>
          <img src={assets.support_img} className='w-8 h-8' alt="Support" />
        </div>
        <p className='font-medium text-lg text-gray-800 mb-2'>Best customer support</p>
        <p className='text-gray-600'>We provide 24/7 customer support</p>
      </div>

    </div>
  )
}

export default OurPolicy
