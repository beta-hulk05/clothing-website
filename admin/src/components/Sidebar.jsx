import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen bg-white shadow-sm'>
        <div className='flex flex-col gap-2 pt-8 pl-[15%] pr-2 text-[15px]'>
            <p className="text-xs font-semibold uppercase text-gray-500 mb-2 pl-3">Main Menu</p>
            
            <NavLink 
                className={({isActive}) => `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 border-l-4 border-purple-600' : 'text-gray-600 hover:bg-gray-50'}`} 
                to="/add"
            >
                <div className="p-1.5 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-md flex items-center justify-center">
                    <img className='w-4 h-4' src={assets.add_icon} alt="" />
                </div>
                <p className='hidden md:block font-medium'>Add Items</p>
            </NavLink>

            <NavLink 
                className={({isActive}) => `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 border-l-4 border-purple-600' : 'text-gray-600 hover:bg-gray-50'}`}
                to="/list"
            >
                <div className="p-1.5 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-md flex items-center justify-center">
                    <img className='w-4 h-4' src={assets.order_icon} alt="" />
                </div>
                <p className='hidden md:block font-medium'>List Items</p>
            </NavLink>

            <NavLink 
                className={({isActive}) => `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 border-l-4 border-purple-600' : 'text-gray-600 hover:bg-gray-50'}`}
                to="/orders"
            >
                <div className="p-1.5 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-md flex items-center justify-center">
                    <img className='w-4 h-4' src={assets.order_icon} alt="" />
                </div>
                <p className='hidden md:block font-medium'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar