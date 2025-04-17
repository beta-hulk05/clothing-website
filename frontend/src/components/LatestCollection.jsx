import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products, navigate } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setLatestProducts(products.slice(0,10));
        setIsLoading(false);
    }, [products])

  return (
    <div className='my-14 py-6'>
      <div className='text-center mb-8'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 max-w-xl'>
          Explore our newest arrivals - fresh designs and timeless favorites updated for the season.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <svg className="animate-spin h-10 w-10 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {latestProducts.map((item,index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))}
        </div>
      )}

      {/* <div className="flex justify-center mt-10">
        <button 
          onClick={() => navigate('/collection')} 
          className="border border-gray-300 hover:border-purple-500 text-gray-700 hover:text-purple-700 px-8 py-2.5 rounded-lg transition-all text-sm font-medium flex items-center gap-2"
        >
          <span>Browse More</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div> */}
    </div>
  )
}

export default LatestCollection
