import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    setIsLoading(true)
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status', 
        {orderId, status:event.target.value}, 
        { headers: {token}}
      )
      if (response.data.success) {
        toast.success("Order status updated!")
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

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

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold mb-4 sm:mb-0 text-gray-800">Customer Orders</h2>

        <div className="w-full sm:w-auto">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none bg-white"
          >
            <option value="all">All Orders</option>
            <option value="Order Placed">New Orders</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <svg className="animate-spin h-10 w-10 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <div className="max-h-[65vh] overflow-y-auto">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No orders found
            </div>
          ) : (
            filteredOrders.map((order, index) => (
              <div 
                className='grid grid-cols-1 gap-6 lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] border border-gray-200 rounded-lg p-6 mb-4 hover:shadow-md transition-all bg-white' 
                key={index}
              >
                <div className="flex lg:flex-col lg:items-center">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <img className='w-8 h-8' src={assets.parcel_icon} alt="" />
                  </div>
                  <div className="ml-4 lg:ml-0 lg:mt-3">
                    <p className="text-xs text-gray-500">Order ID:</p>
                    <p className="text-xs font-medium text-gray-700">{order._id.substring(0, 8)}...</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                        <p className='text-sm text-gray-600'> 
                          {item.name} <span className="text-gray-500">×{item.quantity}</span> <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{item.size}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-800 mb-1">Shipping Details</h4>
                    <p className="text-sm text-gray-700">{order.address.firstName} {order.address.lastName}</p>
                    <p className="text-sm text-gray-600">{order.address.street}, {order.address.city}</p>
                    <p className="text-sm text-gray-600">{order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                    <p className="text-sm text-gray-600 mt-1">Phone: {order.address.phone}</p>
                  </div>
                </div>

                <div className="lg:pl-4">
                  <h4 className="font-medium text-gray-800 mb-2">Order Info</h4>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Date:</span>
                      <span className="text-gray-700">{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Items:</span>
                      <span className="text-gray-700">{order.items.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Payment:</span>
                      <span className="text-gray-700">{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status:</span>
                      <span className={`text-gray-700 ${order.payment ? 'text-green-600' : 'text-orange-600'}`}>
                        {order.payment ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-500">Total:</span>
                      <span className="text-gray-800">{currency}{order.amount}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center lg:col-span-2 lg:flex-row lg:gap-4">
                  <div className="flex items-center mb-3 lg:mb-0">
                    <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(order.status)}`}></div>
                    <p className="font-medium text-gray-800">{order.status}</p>
                  </div>
                  
                  <select 
                    onChange={(event) => statusHandler(event, order._id)} 
                    value={order.status} 
                    className='p-2.5 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none text-gray-700 bg-white w-full lg:w-auto mt-2 lg:mt-0'
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Orders