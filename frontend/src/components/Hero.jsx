import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-300 bg-[#f8f8f8] overflow-hidden'>

            {/* Hero Left Side */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-14 sm:py-16 px-6 sm:px-10'>
                <div className='text-[#414141] max-w-md'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md:text-base'>NEW COLLECTION</p>
                    </div>

                    <h1 className='prata-regular text-4xl sm:py-4 lg:text-5xl leading-tight'>Discover Our Latest Styles</h1>
                    
                    <p className='text-gray-600 py-2 hidden sm:block'>Explore our curated collection of trendy and comfortable clothing for all occasions.</p>

                    <Link to="/collection" className='inline-block mt-2'>
                        <div className='flex items-center gap-2 pt-4 cursor-pointer hover:opacity-80 transition-opacity'>
                            <p className='font-semibold text-sm md:text-base'>EXPLORE COLLECTION</p>
                            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Hero Right Side */}
            <Link to="/collection" className='w-full sm:w-1/2 cursor-pointer'>
                <div className='h-auto aspect-video sm:aspect-auto sm:h-[28rem] flex items-center justify-center bg-[#f0f0f0] relative'>
                    <div className='w-full h-full max-w-2xl mx-auto px-4 sm:px-0 py-4 flex items-center justify-center'>
                        <video 
                            className='w-full h-full object-contain rounded-sm shadow-md'
                            autoPlay
                            loop
                            muted
                            playsInline
                            src={assets.hero_video} 
                            alt="Hero Video"
                        />
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Hero
