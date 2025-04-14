import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name:'Order Payment',
            description:'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {
                    
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            setIsSubmitting(true);

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }
            

            switch (method) {

                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
                    if (responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break;

                case 'razorpay':

                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order)
                    }

                    break;

                default:
                    break;
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* ------------- Left Side ---------------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='grid grid-cols-2 gap-3'>
                    <input 
                        required 
                        onChange={onChangeHandler} 
                        name='firstName' 
                        value={formData.firstName} 
                        className='border border-gray-300 rounded-lg py-2.5 px-4 w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all' 
                        type="text" 
                        placeholder='First name' 
                    />
                    <input 
                        required 
                        onChange={onChangeHandler} 
                        name='lastName' 
                        value={formData.lastName} 
                        className='border border-gray-300 rounded-lg py-2.5 px-4 w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all' 
                        type="text" 
                        placeholder='Last name' 
                    />
                </div>
                <input 
                    required 
                    onChange={onChangeHandler} 
                    name='email' 
                    value={formData.email} 
                    className='border border-gray-300 rounded-lg py-2.5 px-4 w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all' 
                    type="email" 
                    placeholder='Email address' 
                />
                <input 
                    required 
                    onChange={onChangeHandler} 
                    name='street' 
                    value={formData.street} 
                    className='border border-gray-300 rounded-lg py-2.5 px-4 w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all' 
                    type="text" 
                    placeholder='Street' 
                />
                <div className='grid grid-cols-2 gap-3'>
                    <input 
                        required 
                        onChange={onChangeHandler} 
                        name='city' 
                        value={formData.city} 
                        className='border border-gray-300 rounded-lg py-2.5 px-4 w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all' 
                        type="text" 
                        placeholder='City' 
                    />
                    <input 
                        onChange={onChangeHandler} 
                        name='state' 
                        value={formData.state} 
                        className='border border-gray-300 rounded-lg py-2.5 px-4 w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all' 
                        type="text" 
                        placeholder='State' 
                    />
                </div>
                <div className='grid grid-cols-2 gap-3'>
                    <input 
                        required 
                        onChange={onChangeHandler} 
                        name='zipcode' 
                        value={formData.zipcode} 
                        className='border border-gray-300 rounded-lg py-2.5 px-4 w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all' 
                        type="number" 
                        placeholder='Zipcode' 
                    />
                    <input 
                        required 
                        onChange={onChangeHandler} 
                        name='country' 
                        value={formData.country} 
                        className='border border-gray-300 rounded-lg py-2.5 px-4 w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all' 
                        type="text" 
                        placeholder='Country' 
                    />
                </div>
                <input 
                    required 
                    onChange={onChangeHandler} 
                    name='phone' 
                    value={formData.phone} 
                    className='border border-gray-300 rounded-lg py-2.5 px-4 w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all' 
                    type="number" 
                    placeholder='Phone' 
                />
            </div>

            {/* ------------- Right Side ------------------ */}
            <div className='mt-4 sm:mt-8 bg-white p-6 rounded-lg shadow-sm'>

                <div className='min-w-80'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    {/* --------------- Payment Method Selection ------------- */}
                    <div className='flex gap-3 flex-col lg:flex-row mt-4'>
                        <div 
                            onClick={() => setMethod('stripe')} 
                            className={`flex items-center gap-3 border rounded-lg p-3 px-4 cursor-pointer transition-all ${method === 'stripe' ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 shadow-sm' : 'hover:border-gray-400'}`}
                        >
                            <div className={`w-4 h-4 rounded-full border-2 transition-all ${method === 'stripe' ? 'border-purple-500 bg-purple-500' : 'border-gray-400'}`}></div>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe" />
                        </div>
                        <div 
                            onClick={() => setMethod('razorpay')} 
                            className={`flex items-center gap-3 border rounded-lg p-3 px-4 cursor-pointer transition-all ${method === 'razorpay' ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 shadow-sm' : 'hover:border-gray-400'}`}
                        >
                            <div className={`w-4 h-4 rounded-full border-2 transition-all ${method === 'razorpay' ? 'border-purple-500 bg-purple-500' : 'border-gray-400'}`}></div>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay" />
                        </div>
                        <div 
                            onClick={() => setMethod('cod')} 
                            className={`flex items-center gap-3 border rounded-lg p-3 px-4 cursor-pointer transition-all ${method === 'cod' ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 shadow-sm' : 'hover:border-gray-400'}`}
                        >
                            <div className={`w-4 h-4 rounded-full border-2 transition-all ${method === 'cod' ? 'border-purple-500 bg-purple-500' : 'border-gray-400'}`}></div>
                            <p className='text-gray-700 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button 
                            type='submit'
                            disabled={isSubmitting} 
                            className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-10 py-3 text-sm rounded-md shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex ml-auto items-center gap-2'
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    PROCESSING...
                                </>
                            ) : 'PLACE ORDER'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
