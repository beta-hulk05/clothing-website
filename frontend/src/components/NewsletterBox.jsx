import React, { useState } from 'react'

const NewsletterBox = () => {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (email) {
            setSubscribed(true)
            setEmail('')
            // Reset state after 5 seconds
            setTimeout(() => setSubscribed(false), 5000)
        }
    }

  return (
    <div className='text-center bg-gradient-to-r from-purple-50 to-indigo-50 py-12 px-6 rounded-lg shadow-sm'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-600 mt-3 max-w-xl mx-auto'>
      Join our mailing list to receive updates on new arrivals, special offers and other discount information.
      </p>
      
      {subscribed ? (
        <div className="flex items-center justify-center mt-8 gap-3 text-green-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-medium">Successfully subscribed!</p>
        </div>
      ) : (
        <form onSubmit={onSubmitHandler} className='w-full sm:w-2/3 md:w-1/2 flex items-center gap-0 mx-auto my-6 overflow-hidden rounded-md shadow-sm'>
          <input 
            className='w-full flex-1 outline-none py-3.5 px-4 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all'
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email' 
            required
          />
          <button 
            type='submit' 
            className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm px-8 py-4 font-medium transition-all duration-300'
          >
            SUBSCRIBE
          </button>
        </form>
      )}
    </div>
  )
}

export default NewsletterBox
