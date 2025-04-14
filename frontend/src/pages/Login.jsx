import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)
  const [isLoading, setIsLoading] = useState(false);

  const [name,setName] = useState('')
  const [password,setPasword] = useState('')
  const [email,setEmail] = useState('')

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      try {
        if (currentState === 'Sign Up') {
          
          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
          if (response.data.success) {
            toast.success("Registration successful!")
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        } else {

          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
          if (response.data.success) {
            toast.success("Login successful!")
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        }


      } catch (error) {
        console.log(error)
        toast.error(error.message)
      } finally {
        setIsLoading(false);
      }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <div className='flex items-center justify-center min-h-[70vh]'>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800 bg-white p-8 rounded-lg shadow-md'>
          <div className='inline-flex items-center gap-3 mb-4 mt-4'>
              <p className='prata-regular text-3xl'>{currentState}</p>
              <div className='border-none h-[2px] w-8 bg-gradient-to-r from-purple-600 to-indigo-600'></div>
          </div>
          
          <div className="w-full space-y-4">
            {currentState === 'Login' ? '' : (
              <input 
                onChange={(e)=>setName(e.target.value)} 
                value={name} 
                type="text" 
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all' 
                placeholder='Your name' 
                required
              />
            )}
            
            <input 
              onChange={(e)=>setEmail(e.target.value)} 
              value={email} 
              type="email" 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all' 
              placeholder='Your email' 
              required
            />
            
            <input 
              onChange={(e)=>setPasword(e.target.value)} 
              value={password} 
              type="password" 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all' 
              placeholder='Your password' 
              required
            />
          </div>
          
          <div className='w-full flex justify-between text-sm text-gray-600 mt-2'>
              <p className='cursor-pointer hover:text-purple-700 transition-colors'>Forgot your password?</p>
              {
                currentState === 'Login' 
                ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer hover:text-purple-700 transition-colors'>Create account</p>
                : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer hover:text-purple-700 transition-colors'>Login Here</p>
              }
          </div>
          
          <button 
            disabled={isLoading}
            className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium px-8 py-3 mt-6 rounded-md w-full transition-all duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center'
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              currentState === 'Login' ? 'Sign In' : 'Sign Up'
            )}
          </button>
      </form>
    </div>
  )
}

export default Login
