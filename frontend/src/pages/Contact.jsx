import React, { useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        message: ''
      })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div>
      <div className='text-center pt-10 pb-6 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
        <p className='text-gray-600 max-w-xl mx-auto mt-2'>
          Have questions or feedback? We'd love to hear from you. Our team is ready to assist you.
        </p>
      </div>

      <div className='flex flex-col md:flex-row gap-10 mb-16 items-center'>
        <img className='w-full md:max-w-[450px] rounded-lg shadow-sm hover:shadow-md transition-all' src={assets.contact_img} alt="Contact" />
        
        <div className='flex-1'>
          {submitted ? (
            <div className="bg-green-50 text-green-700 py-8 px-6 rounded-lg text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-medium mb-2">Thank you for your message!</h3>
              <p>We'll be in touch with you shortly.</p>
            </div>
          ) : (
            <>
              <div className='bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all mb-8'>
                <h3 className='font-semibold text-lg text-gray-800 mb-6'>Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all min-h-[120px]"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-md transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <div className="p-3 mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-indigo-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-800">Our Store</h3>
                  <p className="text-gray-600 mt-2">54709 Willms Station<br/>Suite 350, Washington, USA</p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <div className="p-3 mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-indigo-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-800">Get in Touch</h3>
                  <p className="text-gray-600 mt-2">Tel: (415) 555-0132<br/>Email: admin@forever.com</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
