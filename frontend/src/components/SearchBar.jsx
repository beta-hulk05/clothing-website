import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false)
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        }
        else {
            setVisible(false)
        }
    }, [location])
    
  return showSearch && visible ? (
    <div className='border-t border-b bg-gradient-to-r from-gray-50 to-white text-center py-3 animate-fadeIn transition-all'>
      <div className='inline-flex items-center justify-center border border-gray-300 hover:border-purple-400 transition-all px-5 py-2.5 my-1 mx-3 rounded-full w-3/4 sm:w-1/2 shadow-sm bg-white'>
        <input 
          value={search} 
          onChange={(e)=>setSearch(e.target.value)} 
          className='flex-1 outline-none bg-transparent text-gray-700 text-sm placeholder:text-gray-400' 
          type="text" 
          placeholder='Search products...'
        />
        <img className='w-4 h-4 text-gray-500' src={assets.search_icon} alt="Search" />
      </div>
      <button 
        onClick={()=>setShowSearch(false)} 
        className='inline-flex items-center justify-center ml-2 w-7 h-7 rounded-full hover:bg-gray-200 transition-all'
      >
        <img className='w-3 cursor-pointer' src={assets.cross_icon} alt="Close" />
      </button>
    </div>
  ) : null
}

export default SearchBar
