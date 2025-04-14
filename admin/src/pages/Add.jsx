import React, { useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [category, setCategory] = useState("Men");
   const [subCategory, setSubCategory] = useState("Topwear");
   const [bestseller, setBestseller] = useState(false);
   const [sizes, setSizes] = useState([]);

   const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true)
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])
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
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Product</h2>
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-5'>
          <div className="w-full">
            <p className='mb-3 font-medium text-gray-700'>Product Images</p>

            <div className='flex gap-4 flex-wrap'>
              <label htmlFor="image1" className="cursor-pointer group">
                <div className={`w-24 h-24 rounded-lg overflow-hidden border-2 border-dashed ${image1 ? 'border-purple-400' : 'border-gray-300'} flex items-center justify-center hover:border-purple-500 transition-all`}>
                  {!image1 ? (
                    <div className="text-center text-gray-400 group-hover:text-purple-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-xs">Add Image</span>
                    </div>
                  ) : (
                    <img className='w-full h-full object-cover' src={URL.createObjectURL(image1)} alt="" />
                  )}
                </div>
                <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
              </label>
              
              <label htmlFor="image2" className="cursor-pointer group">
                <div className={`w-24 h-24 rounded-lg overflow-hidden border-2 border-dashed ${image2 ? 'border-purple-400' : 'border-gray-300'} flex items-center justify-center hover:border-purple-500 transition-all`}>
                  {!image2 ? (
                    <div className="text-center text-gray-400 group-hover:text-purple-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-xs">Add Image</span>
                    </div>
                  ) : (
                    <img className='w-full h-full object-cover' src={URL.createObjectURL(image2)} alt="" />
                  )}
                </div>
                <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
              </label>
              
              <label htmlFor="image3" className="cursor-pointer group">
                <div className={`w-24 h-24 rounded-lg overflow-hidden border-2 border-dashed ${image3 ? 'border-purple-400' : 'border-gray-300'} flex items-center justify-center hover:border-purple-500 transition-all`}>
                  {!image3 ? (
                    <div className="text-center text-gray-400 group-hover:text-purple-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-xs">Add Image</span>
                    </div>
                  ) : (
                    <img className='w-full h-full object-cover' src={URL.createObjectURL(image3)} alt="" />
                  )}
                </div>
                <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
              </label>
              
              <label htmlFor="image4" className="cursor-pointer group">
                <div className={`w-24 h-24 rounded-lg overflow-hidden border-2 border-dashed ${image4 ? 'border-purple-400' : 'border-gray-300'} flex items-center justify-center hover:border-purple-500 transition-all`}>
                  {!image4 ? (
                    <div className="text-center text-gray-400 group-hover:text-purple-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="text-xs">Add Image</span>
                    </div>
                  ) : (
                    <img className='w-full h-full object-cover' src={URL.createObjectURL(image4)} alt="" />
                  )}
                </div>
                <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
              </label>
            </div>
          </div>

          <div className='w-full'>
            <p className='mb-2 font-medium text-gray-700'>Product Name</p>
            <input 
              onChange={(e)=>setName(e.target.value)} 
              value={name} 
              className='w-full max-w-[600px] px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-none' 
              type="text" 
              placeholder='Enter product name' 
              required
            />
          </div>

          <div className='w-full'>
            <p className='mb-2 font-medium text-gray-700'>Product Description</p>
            <textarea 
              onChange={(e)=>setDescription(e.target.value)} 
              value={description} 
              className='w-full max-w-[600px] px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-none min-h-[100px]' 
              placeholder='Write product description here' 
              required
            ></textarea>
          </div>

          <div className='flex flex-col sm:flex-row gap-6 w-full'>
              <div className="w-full sm:w-1/3">
                <p className='mb-2 font-medium text-gray-700'>Category</p>
                <select 
                  onChange={(e) => setCategory(e.target.value)} 
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-none bg-white'
                >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                </select>
              </div>

              <div className="w-full sm:w-1/3">
                <p className='mb-2 font-medium text-gray-700'>Sub Category</p>
                <select 
                  onChange={(e) => setSubCategory(e.target.value)} 
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-none bg-white'
                >
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                </select>
              </div>

              <div className="w-full sm:w-1/3">
                <p className='mb-2 font-medium text-gray-700'>Price ($)</p>
                <input 
                  onChange={(e) => setPrice(e.target.value)} 
                  value={price} 
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-none' 
                  type="number" 
                  placeholder='Enter price' 
                  required
                />
              </div>
          </div>

          <div>
            <p className='mb-3 font-medium text-gray-700'>Available Sizes</p>
            <div className='flex flex-wrap gap-3'>
              {["S", "M", "L", "XL", "XXL"].map(size => (
                <div 
                  key={size}
                  onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}
                  className={`px-5 py-2 rounded-md cursor-pointer transition-all ${
                    sizes.includes(size) 
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className='flex items-center gap-2 mt-2'>
            <div 
              onClick={() => setBestseller(prev => !prev)}
              className={`w-5 h-5 rounded border transition-all cursor-pointer flex items-center justify-center ${
                bestseller ? 'bg-purple-600 border-purple-600' : 'border-gray-400'
              }`}
            >
              {bestseller && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <label className='cursor-pointer text-gray-700'>Add to bestseller</label>
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !image1 || sizes.length === 0}
            className='mt-4 px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2'
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Product
              </>
            )}
          </button>
      </form>
    </div>
  )
}

export default Add