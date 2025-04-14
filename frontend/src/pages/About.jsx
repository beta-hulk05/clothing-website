import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-center pt-10 pb-6 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
        <p className="text-gray-600 max-w-xl mx-auto mt-2">
          We're on a mission to deliver quality fashion that makes you look and feel your best.
        </p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] rounded-lg shadow-sm object-cover hover:shadow-md transition-all' src={assets.about_img} alt="About Us" />
        
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          
          <div className="p-6 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 my-2">
            <h3 className='text-xl font-medium text-gray-800 mb-3'>Our Mission</h3>
            <p className="text-gray-600">Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
          </div>
          
          <p>We believe that fashion is more than just clothing—it's a form of self-expression. That's why we carefully select each item in our collection to ensure it meets our standards of quality, style, and sustainability.</p>
        </div>
      </div>

      <div className='text-center pt-8 pb-6'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'>
        <div className='bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-all duration-300 hover:transform hover:scale-[1.02]'>
          <div className="p-3 mb-5 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-indigo-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 className='font-medium text-lg text-gray-800 mb-3'>Quality Assurance</h3>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        
        <div className='bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-all duration-300 hover:transform hover:scale-[1.02]'>
          <div className="p-3 mb-5 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-indigo-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className='font-medium text-lg text-gray-800 mb-3'>Convenience</h3>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        
        <div className='bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-all duration-300 hover:transform hover:scale-[1.02]'>
          <div className="p-3 mb-5 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-indigo-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className='font-medium text-lg text-gray-800 mb-3'>Exceptional Customer Service</h3>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default About
