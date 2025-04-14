import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true)
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-indigo-50 to-purple-50'>
        <div className='bg-white shadow-2xl rounded-2xl px-10 py-8 max-w-md w-11/12 transform transition-all duration-300 hover:scale-[1.01]'>
            <h1 className='text-3xl font-bold mb-1 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600'>Admin Panel</h1>
            <p className='text-gray-500 mb-6'>Login to access your dashboard</p>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-5 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    <input 
                        onChange={(e)=>setEmail(e.target.value)} 
                        value={email} 
                        className='rounded-lg w-full px-4 py-3 border border-gray-200 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all' 
                        type="email" 
                        placeholder='your@email.com' 
                        required 
                    />
                </div>
                <div className='mb-6 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input 
                        onChange={(e)=>setPassword(e.target.value)} 
                        value={password} 
                        className='rounded-lg w-full px-4 py-3 border border-gray-200 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all' 
                        type="password" 
                        placeholder='Enter your password' 
                        required 
                    />
                </div>
                <button 
                    className='mt-2 w-full py-3 px-4 rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg disabled:opacity-70 flex justify-center items-center' 
                    type="submit" 
                    disabled={isLoading}
                > 
                    {isLoading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : 'Login'}
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login