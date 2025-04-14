import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size,setSize] = useState('')
  const [added, setAdded] = useState(false)

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  const handleAddToCart = (id, selectedSize) => {
    if (!selectedSize) return;
    
    addToCart(id, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  useEffect(() => {
    fetchProductData();
  }, [productId,products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-all duration-500 opacity-100'>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto hide-scrollbar justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productData.image.map((item,index)=>(
                  <img 
                    onClick={()=>setImage(item)} 
                    src={item} 
                    key={index} 
                    className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md hover:shadow-md transition-all ${image === item ? 'ring-2 ring-purple-400 shadow-md' : ''}`} 
                    alt="" 
                  />
                ))
              }
          </div>
          <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto rounded-lg shadow-sm hover:shadow-md transition-all' src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1'>
          <h1 className='font-semibold text-2xl md:text-3xl mt-2 text-gray-800'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
              <div className="flex">
                <img src={assets.star_icon} alt="" className="w-4 h-4" />
                <img src={assets.star_icon} alt="" className="w-4 h-4" />
                <img src={assets.star_icon} alt="" className="w-4 h-4" />
                <img src={assets.star_icon} alt="" className="w-4 h-4" />
                <img src={assets.star_dull_icon} alt="" className="w-4 h-4" />
              </div>
              <p className='pl-2 text-sm text-gray-600'>(122 Reviews)</p>
          </div>
          <p className='mt-5 text-3xl font-medium text-gray-800'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-600 md:w-4/5 leading-relaxed'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
              <p className="font-medium text-gray-800">Select Size</p>
              <div className='flex gap-3'>
                {productData.sizes.map((item,index)=>(
                  <button 
                    onClick={()=>setSize(item)} 
                    className={`border py-2 px-4 rounded-md transition-all ${item === size 
                      ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 shadow-sm' 
                      : 'bg-gray-50 hover:bg-gray-100'}`} 
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
          </div>
          <button 
            onClick={()=>handleAddToCart(productData._id, size)} 
            disabled={!size || added}
            className={`bg-gradient-to-r ${added ? 'from-green-600 to-emerald-600' : 'from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'} text-white px-8 py-3 rounded-md text-sm active:scale-95 transform transition-all duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2`}
          >
            {added ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                ADDED TO CART
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                ADD TO CART
              </>
            )}
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p>100% Original product.</p>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p>Cash on delivery is available on this product.</p>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className='mt-20'>
        <div className='flex rounded-t-lg overflow-hidden'>
          <div className='border-b-2 border-purple-600 px-5 py-3 text-sm font-medium text-purple-800 bg-gradient-to-r from-purple-50 to-indigo-50'>Description</div>
          <div className='border px-5 py-3 text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors cursor-pointer'>Reviews (122)</div>
        </div>
        <div className='flex flex-col gap-4 border rounded-b-lg px-6 py-6 text-sm text-gray-600 bg-white'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>

      {/* --------- display related products ---------- */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='flex justify-center items-center h-80'>
        <svg className="animate-spin h-10 w-10 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
}

export default Product
