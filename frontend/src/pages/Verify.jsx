import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams] = useSearchParams()
    const [isVerifying, setIsVerifying] = useState(true)
    const [status, setStatus] = useState({ success: false, message: '' })
    
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            setIsVerifying(true)

            if (!token) {
                setStatus({ success: false, message: 'Authentication required. Please login.' })
                return null
            }

            const response = await axios.post(
                backendUrl + '/api/order/verifyStripe', 
                { success, orderId }, 
                { headers: { token } }
            )

            if (response.data.success) {
                setCartItems({})
                setStatus({ 
                    success: true, 
                    message: 'Payment verified successfully! Redirecting to your orders...' 
                })
                
                // Delay navigation for a better UX
                setTimeout(() => {
                    navigate('/orders')
                }, 2000)
            } else {
                setStatus({ 
                    success: false, 
                    message: 'Payment verification failed. Please contact support.' 
                })
                setTimeout(() => {
                    navigate('/cart')
                }, 3000)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            setStatus({ 
                success: false, 
                message: 'An error occurred during payment verification.' 
            })
            setTimeout(() => {
                navigate('/cart')
            }, 3000)
        } finally {
            setIsVerifying(false)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
                {isVerifying ? (
                    <>
                        <div className="flex justify-center mb-4">
                            <svg className="animate-spin h-12 w-12 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-medium text-gray-800 mb-2">Verifying Payment</h2>
                        <p className="text-gray-600">Please wait while we confirm your payment...</p>
                    </>
                ) : status.success ? (
                    <>
                        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-medium text-gray-800 mb-2">Payment Successful!</h2>
                        <p className="text-gray-600 mb-4">{status.message}</p>
                        <div className="animate-pulse bg-gray-200 h-1 w-1/2 mx-auto rounded"></div>
                    </>
                ) : (
                    <>
                        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-medium text-gray-800 mb-2">Payment Issue</h2>
                        <p className="text-gray-600 mb-6">{status.message}</p>
                        <button 
                            onClick={() => navigate('/cart')} 
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium px-6 py-2 rounded-md transition-all"
                        >
                            Return to Cart
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Verify