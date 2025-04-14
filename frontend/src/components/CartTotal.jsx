import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext);

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-3 mt-4 text-gray-700'>
        <div className='flex justify-between items-center py-2'>
          <p className="font-medium">Subtotal</p>
          <p className="text-gray-800">{currency}{getCartAmount()}.00</p>
        </div>
        <hr className="border-gray-200" />
        
        <div className='flex justify-between items-center py-2'>
          <p className="font-medium">Shipping Fee</p>
          <p className="text-gray-800">{currency}{delivery_fee}.00</p>
        </div>
        <hr className="border-gray-200" />
        
        <div className='flex justify-between items-center py-2'>
          <p className="font-semibold text-gray-900">Total</p>
          <p className="font-semibold text-gray-900 text-xl">{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
