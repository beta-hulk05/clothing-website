import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products, navigate} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        setIsLoading(true);
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5));
        setIsLoading(false);
    },[products])

  return (
    <div className='my-20 py-6'>
      <div className='text-center mb-8'>
        <Title text1={'BEST'} text2={'SELLERS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 max-w-xl'>
          Our most popular products that customers love. Quality, style, and value that stand the test of time.
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
        <>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6'>
            {bestSeller.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))}
          </div>
          
          {/* <div className="flex justify-center mt-10">
            <button 
              onClick={() => navigate('/collection')} 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-2.5 rounded-lg shadow-sm hover:shadow transition-all text-sm font-medium"
            >
              View All Products
            </button>
          </div> */}
        </>
      )}
    </div>
  )
}

export default BestSeller
