import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify'

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setorderData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [processingIds, setProcessingIds] = useState([])

  const getStatusColor = (status) => {
    switch(status) {
      case 'Order Placed': return 'bg-blue-500';
      case 'Packing': return 'bg-yellow-500';
      case 'Shipped': return 'bg-purple-500';
      case 'Out for delivery': return 'bg-orange-500';
      case 'Delivered': return 'bg-green-500';
      case 'Canceled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }
      
      setIsLoading(true);
      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['orderId'] = order._id  // Add order ID to each item
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders")
    } finally {
      setIsLoading(false);
    }
  }

  const cancelOrder = async (orderId) => {
    try {
      if (!token) {
        toast.error("Authentication required. Please login again.");
        return;
      }
      
      setProcessingIds(prev => [...prev, orderId]);
      
      const response = await axios.post(
        backendUrl + '/api/order/cancel',
        { orderId }, // We only need to send orderId, userId will be extracted from token
        { headers: { token } }
      );
      
      if (response.data.success) {
        toast.success(response.data.message);
        loadOrderData();
      } else {
        toast.error(response.data.message || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Cancel order error:", error);
      toast.error(error.response?.data?.message || "Failed to cancel order. Please try again later.");
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== orderId));
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className='border-t pt-16'>

        <div className='text-2xl mb-6 flex justify-between items-center'>
            <Title text1={'MY'} text2={'ORDERS'}/>
            <button 
              onClick={loadOrderData} 
              className='text-sm px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-md shadow-sm transition-all duration-200 flex items-center gap-2'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <svg className="animate-spin h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : orderData.length === 0 ? (
          <div className="text-center py-16 text-gray-500 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-xl font-medium">No orders found</p>
            <p className="mt-2">Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {
              orderData.map((item,index) => (
                <div key={index} className='py-6 px-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all bg-white text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div className='flex items-start gap-6 text-sm'>
                        <img className='w-16 sm:w-20 rounded-md object-cover' src={item.image[0]} alt="" />
                        <div>
                          <p className='sm:text-lg font-medium text-gray-800'>{item.name}</p>
                          <div className='flex flex-wrap items-center gap-3 mt-2 text-base text-gray-700'>
                            <p className="font-medium">{currency}{item.price}</p>
                            <div className="h-4 w-[1px] bg-gray-300"></div>
                            <p>Quantity: <span className="font-medium">{item.quantity}</span></p>
                            <div className="h-4 w-[1px] bg-gray-300"></div>
                            <p>Size: <span className="font-medium">{item.size}</span></p>
                          </div>
                          <div className="mt-3 text-sm text-gray-600 space-y-1">
                            <p>Date: <span className='text-gray-700'>{new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span></p>
                            <p>Payment: <span className='text-gray-700'>{item.paymentMethod}</span></p>
                          </div>
                        </div>
                    </div>
                    <div className='md:w-1/3 flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>
                            <p className='text-sm md:text-base font-medium'>{item.status}</p>
                        </div>
                        {item.status !== 'Shipped' && 
                         item.status !== 'Out for delivery' && 
                         item.status !== 'Delivered' && 
                         item.status !== 'Canceled' ? (
                          <button 
                            onClick={() => cancelOrder(item.orderId)} 
                            disabled={processingIds.includes(item.orderId)}
                            className='border border-red-300 hover:bg-red-50 text-red-600 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                          >
                            {processingIds.includes(item.orderId) ? (
                              <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </span>
                            ) : "Cancel Order"}
                          </button>
                        ) : (
                          <button 
                            onClick={loadOrderData} 
                            className='border border-gray-300 hover:border-gray-400 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:bg-gray-50'
                          >
                            Track Order
                          </button>
                        )}
                    </div>
                </div>
              ))
            }
          </div>
        )}
    </div>
  )
}

export default Orders
