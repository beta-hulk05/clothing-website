import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/' className='flex items-center'>
        {/* <img src="/rny.jpg" className='h-10 mr-3' alt="RNY" /> */}
        <img src={assets.rny} className='w-36' alt="Forever" />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1 hover:text-purple-700 transition-colors'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gradient-to-r from-purple-500 to-indigo-500 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1 hover:text-purple-700 transition-colors'>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gradient-to-r from-purple-500 to-indigo-500 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1 hover:text-purple-700 transition-colors'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gradient-to-r from-purple-500 to-indigo-500 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1 hover:text-purple-700 transition-colors'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gradient-to-r from-purple-500 to-indigo-500 hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <button 
          onClick={()=> { setShowSearch(true); navigate('/collection') }} 
          className='w-5 cursor-pointer hover:text-purple-700 transition-colors'
        >
          <img src={assets.search_icon} className='w-5 opacity-80 hover:opacity-100 transition-opacity' alt="Search" />
        </button>
            
        <div className='group relative'>
          <button 
            onClick={()=> token ? null : navigate('/login')} 
            className='w-5 cursor-pointer hover:text-purple-700 transition-colors'
          >
            <img className='w-5 opacity-80 hover:opacity-100 transition-opacity' src={assets.profile_icon} alt="Profile" />
          </button>
          
          {/* Dropdown Menu */}
          {token && 
            <div className='invisible group-hover:visible absolute dropdown-menu right-0 pt-4 z-10 transition-all opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-1'>
              <div className='flex flex-col gap-2 w-40 py-4 px-5 bg-white text-gray-700 rounded-lg shadow-md border border-gray-100'>
                <div className="border-b pb-2 mb-1">
                  <p className="text-xs text-gray-500">Welcome back</p>
                  <p className="font-medium">User</p>
                </div>
                <button 
                  onClick={() => navigate('/orders')} 
                  className='text-left cursor-pointer hover:text-purple-700 transition-colors flex items-center gap-2'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  My Orders
                </button>
                <button 
                  onClick={logout} 
                  className='text-left cursor-pointer hover:text-purple-700 transition-colors flex items-center gap-2'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          }
        </div>
        
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5 opacity-80 hover:opacity-100 transition-opacity' alt="Cart" />
          {getCartCount() > 0 && (
            <span className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white aspect-square rounded-full text-[8px] flex items-center justify-center font-bold'>{getCartCount()}</span>
          )}
        </Link>
        
        <button 
          onClick={()=>setVisible(true)} 
          className='w-5 cursor-pointer sm:hidden'
        >
          <img src={assets.menu_icon} className='w-5 opacity-80 hover:opacity-100 transition-opacity' alt="Menu" />
        </button> 
      </div>

      {/* Sidebar menu for small screens */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 bg-white shadow-lg overflow-hidden transition-all duration-300 ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600 h-full'>
          <div className="border-b p-5">
            <div onClick={()=>setVisible(false)} className='flex items-center gap-4 cursor-pointer'>
              <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
              <p>Close Menu</p>
            </div>
          </div>
          
          <div className="flex flex-col flex-1 p-5 gap-4">
            <NavLink onClick={()=>setVisible(false)} className='py-2 hover:text-purple-700 transition-colors' to='/'>HOME</NavLink>
            <NavLink onClick={()=>setVisible(false)} className='py-2 hover:text-purple-700 transition-colors' to='/collection'>COLLECTION</NavLink>
            <NavLink onClick={()=>setVisible(false)} className='py-2 hover:text-purple-700 transition-colors' to='/about'>ABOUT</NavLink>
            <NavLink onClick={()=>setVisible(false)} className='py-2 hover:text-purple-700 transition-colors' to='/contact'>CONTACT</NavLink>
          </div>
          
          {token && (
            <div className="mt-auto border-t p-5">
              <button 
                onClick={() => {logout(); setVisible(false);}} 
                className='w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2'
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Navbar
