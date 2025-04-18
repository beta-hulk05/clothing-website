import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id,image,name,price}) => {
    const {currency} = useContext(ShopContext);

  return (
    <Link 
      onClick={()=>scrollTo(0,0)} 
      className='text-gray-700 cursor-pointer group' 
      to={`/product/${id}`}
    >
      <div className='overflow-hidden rounded-lg shadow-sm bg-white hover:shadow-md transition-all duration-300'>
        <div className="relative overflow-hidden">
          <img 
            className='w-full h-52 sm:h-64 object-cover hover:scale-105 transition-all duration-500 ease-in-out' 
            src={image[0]} 
            alt={name} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="px-3 py-3">
          <p className='text-sm font-medium line-clamp-1'>{name}</p>
          <div className="flex items-center gap-2 mt-1">
            <p className='text-sm font-semibold text-purple-700'>{currency}{price}</p>
            <p className='text-xs text-gray-500 line-through'>{currency}999</p>
            <p className='text-xs font-medium text-green-600'>40% off</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
