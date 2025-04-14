import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
    
    setIsLoading(false);
  }, [cartItems, products])

  return (
    <div className='border-t pt-14'>

      <div className='text-2xl mb-6 flex justify-between items-center'>
        <Title text1={'YOUR'} text2={'CART'} />
        <span className="text-sm text-gray-600">
          {cartData.length} {cartData.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <svg className="animate-spin h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : cartData.length === 0 ? (
        <div className="text-center py-16 text-gray-500 flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-xl font-medium">Your cart is empty</p>
          <p className="mt-2">Add items to it now</p>
          <button 
            onClick={() => navigate('/collection')}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md shadow-sm hover:shadow-md transition-all"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <>
          <div className='space-y-4'>
            {
              cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);
                
                return (
                  <div key={index} className='py-5 px-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                    <div className='flex items-start gap-6'>
                      <img className='w-16 sm:w-20 rounded-md object-cover' src={productData.image[0]} alt="" />
                      <div>
                        <p className='text-sm sm:text-lg font-medium text-gray-800'>{productData.name}</p>
                        <div className='flex items-center gap-5 mt-2'>
                          <p className="font-medium">{currency}{productData.price}</p>
                          <div className="px-2 sm:px-3 sm:py-1 border bg-gray-50 rounded text-sm">{item.size}</div>
                        </div>
                      </div>
                    </div>
                    <input 
                      onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                      className='border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none rounded-md max-w-10 sm:max-w-20 px-2 py-1' 
                      type="number" 
                      min={1} 
                      defaultValue={item.quantity} 
                    />
                    <button 
                      onClick={() => updateQuantity(item._id, item.size, 0)} 
                      className='flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors'
                    >
                      <img className='w-4 sm:w-5 opacity-70 hover:opacity-100 transition-opacity' src={assets.bin_icon} alt="Remove" />
                    </button>
                  </div>
                )
              })
            }
          </div>

          <div className='flex justify-end my-20'>
            <div className='w-full sm:w-[450px] p-6 bg-white rounded-lg shadow-sm'>
              <CartTotal />
              <div className='w-full text-end'>
                <button 
                  onClick={() => navigate('/place-order')} 
                  className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm my-8 px-8 py-3 rounded-md shadow-md transition-all duration-300 flex items-center gap-2 ml-auto'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
