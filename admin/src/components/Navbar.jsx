import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-4 px-[4%] justify-between bg-white shadow-sm'>
        <div className="flex items-center">
            <img className='w-[max(10%,100px)]' src={assets.logo} alt="" />
            <div className="hidden md:flex ml-6 items-center">
                <div className="h-8 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
                <span className="ml-3 text-lg font-medium text-gray-700">Admin Dashboard</span>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <span className="hidden md:inline text-gray-500">Welcome, Admin</span>
            <button 
                onClick={()=>setToken('')} 
                className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow hover:shadow-md flex items-center gap-2'
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
            </button>
        </div>
    </div>
  )
}

export default Navbar