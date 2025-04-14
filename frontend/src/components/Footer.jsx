import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="bg-gray-50 mt-20 py-6 rounded-t-3xl">
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 py-10'>

        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="Forever" />
            <p className='w-full md:w-2/3 text-gray-600 leading-relaxed'>
              An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions.
            </p>
            <div className="flex gap-4 mt-6">
              <Link to="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-md transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </Link>
              <Link to="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-md transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </Link>
              <Link to="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-md transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
            </div>
        </div>

        <div>
            <p className='text-lg font-medium mb-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600'>QUICK LINKS</p>
            <ul className='flex flex-col gap-3 text-gray-600'>
                <li className="hover:text-purple-700 transition-colors">
                  <Link to="/" className="hover:text-purple-700 transition-colors">Home</Link>
                </li>
                <li className="hover:text-purple-700 transition-colors">
                  <Link to="/collection" className="hover:text-purple-700 transition-colors">Collection</Link>
                </li>
                <li className="hover:text-purple-700 transition-colors">
                  <Link to="/about" className="hover:text-purple-700 transition-colors">About Us</Link>
                </li>
                <li className="hover:text-purple-700 transition-colors">
                  <Link to="/contact" className="hover:text-purple-700 transition-colors">Contact Us</Link>
                </li>
                <li className="hover:text-purple-700 transition-colors">
                  <Link to="/cart" className="hover:text-purple-700 transition-colors">Cart</Link>
                </li>
            </ul>
        </div>

        <div>
            <p className='text-lg font-medium mb-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-3 text-gray-600'>
                <li className="hover:text-purple-700 transition-colors cursor-pointer flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  C-28, Raj nagar, Jaipur road, Bikaner
                </li>
                <li className="hover:text-purple-700 transition-colors cursor-pointer flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  rnyclothing8@gmail.com
                </li>
            </ul>
        </div>
      </div>

      <div>
          <hr className="border-gray-200" />
          <p className='py-5 text-sm text-center text-gray-500'>Copyright 2025 © rnyclothing.in - All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
