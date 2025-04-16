import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  // Standard sizes that will be displayed for all products
  const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [added, setAdded] = useState(false)
  
  // Refs for image zoom functionality
  const imageContainerRef = useRef(null);
  const zoomLensRef = useRef(null);
  const zoomedImageRef = useRef(null);
  
  // State for zoom lens visibility
  const [isZooming, setIsZooming] = useState(false);

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
  
  // Image zoom functionality
  const handleImageZoom = (e) => {
    if (!imageContainerRef.current || !zoomLensRef.current || !zoomedImageRef.current) return;
    
    const container = imageContainerRef.current;
    const lens = zoomLensRef.current;
    const zoomedImg = zoomedImageRef.current;
    
    // Get position of image container
    const { left: imgX, top: imgY, width: imgWidth, height: imgHeight } = 
      container.getBoundingClientRect();
    
    // Calculate cursor position relative to the image
    const x = e.clientX - imgX;
    const y = e.clientY - imgY;
    
    // Lens dimensions (you can adjust these)
    const lensWidth = 100;
    const lensHeight = 100;
    
    // Make sure the lens doesn't go outside the image
    let lensLeft = x - lensWidth / 2;
    let lensTop = y - lensHeight / 2;
    
    // Constraint lens position
    if (lensLeft < 0) lensLeft = 0;
    if (lensTop < 0) lensTop = 0;
    if (lensLeft > imgWidth - lensWidth) lensLeft = imgWidth - lensWidth;
    if (lensTop > imgHeight - lensHeight) lensTop = imgHeight - lensHeight;
    
    // Position the lens
    lens.style.left = `${lensLeft}px`;
    lens.style.top = `${lensTop}px`;
    lens.style.width = `${lensWidth}px`;
    lens.style.height = `${lensHeight}px`;
    
    // Calculate zoom ratio (3x zoom)
    const ratio = 3;
    
    // Position the zoomed image
    zoomedImg.style.backgroundImage = `url(${image})`;
    zoomedImg.style.backgroundSize = `${imgWidth * ratio}px ${imgHeight * ratio}px`;
    zoomedImg.style.backgroundPosition = `-${lensLeft * ratio}px -${lensTop * ratio}px`;
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // Check if a size is in stock
  const isSizeInStock = (sizeToCheck) => {
    return productData && productData.sizes.includes(sizeToCheck);
  };

  // Set size only if it's in stock
  const handleSizeSelect = (selectedSize) => {
    if (isSizeInStock(selectedSize)) {
      setSize(selectedSize);
    }
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const partialStar = rating % 1;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Add partial star if needed
    if (partialStar > 0) {
      stars.push(
        <div key="partial" className="relative">
          {/* Gray background star */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          
          {/* Yellow overlay for partial fill */}
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${partialStar * 100}%` }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      );
    }
    
    // Add empty stars
    for (let i = Math.ceil(rating); i < 5; i++) {
      stars.push(
        <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };

  return productData ? (
    <div className='border-t-2 pt-10 transition-all duration-500 opacity-100 pb-10'>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-12 sm:gap-16 flex-col sm:flex-row max-w-7xl mx-auto px-4'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          {/* Thumbnails */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto hide-scrollbar gap-2 sm:gap-3 justify-start sm:justify-normal sm:w-[15%] w-full p-1 sm:p-2'>
              {
                productData.image.map((item, index) => (
                  <div 
                    key={index}
                    className={`relative overflow-hidden rounded-xl transition-all duration-300 flex-shrink-0 ${image === item ? 'ring-2 ring-purple-500' : ''}`}
                  >
                    <img 
                      onClick={() => setImage(item)} 
                      src={item}
                      className={`w-20 h-20 sm:w-full sm:h-auto object-cover cursor-pointer rounded-xl hover:shadow-md transition-all ${image !== item && 'filter opacity-70'}`} 
                      alt={`Product view ${index + 1}`}
                    />
                  </div>
                ))
              }
          </div>
          
          {/* Main Image with Zoom */}
          <div className='w-full sm:w-[85%] relative'>
            <div 
              ref={imageContainerRef}
              className='relative rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100'
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleImageZoom}
            >
              <img 
                className='w-full h-auto rounded-2xl transition-all object-cover' 
                src={image} 
                alt={productData.name} 
              />
              
              {/* Zoom lens overlay (only visible when hovering) */}
              {isZooming && (
                <div 
                  ref={zoomLensRef}
                  className="absolute border-2 border-purple-400 bg-white bg-opacity-20 pointer-events-none"
                ></div>
              )}
            </div>
            
            {/* Zoomed image container - Positioned to the side */}
            {isZooming && (
              <div 
                ref={zoomedImageRef}
                className="hidden md:block fixed z-50 w-[400px] h-[400px] border border-gray-200 rounded-2xl shadow-xl bg-no-repeat bg-white"
                style={{
                  top: '50vh',
                  right: '5%',
                  transform: 'translateY(-50%)'
                }}
              ></div>
            )}

            <div className="hidden sm:flex justify-center mt-4 gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Hover to zoom</span>
              </div>
            </div>
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1 flex flex-col'>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                {productData.category}
              </span>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
                {productData.subCategory}
              </span>
            </div>
            
            <h1 className='font-semibold text-2xl md:text-3xl text-gray-800'>{productData.name}</h1>
            
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {renderStars(4.2)}
              </div>
              <span className="text-xs font-medium text-gray-500">4.2</span>
            </div>
          </div>

          <div className="mt-6 mb-4">
            <div className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              {currency}{productData.price}
              <span className="text-sm font-normal text-gray-500 line-through">{currency}{Math.round(productData.price * 1.2)}</span>
              <span className="text-sm font-medium text-green-600">20% off</span>
            </div>
            <p className="text-sm text-green-600 mt-1">Inclusive of all taxes</p>
          </div>

          <div className='flex flex-col gap-5 my-6'>
              <div>
                <p className="font-medium text-gray-800 mb-3">Select Size</p>
                <div className='flex gap-3 flex-wrap'>
                  {ALL_SIZES.map((item, index) => {
                    const inStock = isSizeInStock(item);
                    return (
                      <button 
                        onClick={() => inStock ? handleSizeSelect(item) : null} 
                        disabled={!inStock}
                        className={`relative border-2 h-10 w-10 flex items-center justify-center rounded-full transition-all 
                          ${item === size ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm font-medium' : 
                            inStock ? 'border-gray-200 hover:border-gray-300' : 
                            'border-gray-200 text-gray-400 cursor-not-allowed opacity-70'}`} 
                        key={index}
                      >
                        {item}
                        {!inStock && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-[1.5px] bg-gray-400 rotate-45 transform origin-center"></div>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
                {size === '' && (
                  <p className="text-xs text-gray-500 mt-2">
                    {productData.sizes.length > 0 
                      ? "Please select a size" 
                      : "All sizes are currently out of stock"}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className='w-full max-w-xs mt-2'>
                  <button 
                    onClick={()=>handleAddToCart(productData._id, size)} 
                    disabled={!size || added || productData.sizes.length === 0}
                    className={`w-full bg-gradient-to-r 
                      ${added ? 'from-green-600 to-emerald-600' : 
                        productData.sizes.length === 0 ? 'from-gray-400 to-gray-500' : 
                        'from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'} 
                      text-white px-8 py-4 rounded-xl text-sm active:scale-[0.98] transform transition-all duration-200 
                      shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium`}
                  >
                    {added ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        ADDED TO CART
                      </>
                    ) : productData.sizes.length === 0 ? (
                      "OUT OF STOCK"
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        ADD TO CART
                      </>
                    )}
                  </button>
                </div>
                {size === '' && productData.sizes.length > 0 && <p className="text-xs text-red-500">Please select a size</p>}
              </div>
          </div>
          
          <hr className='my-6' />
          
          <div className='text-sm text-gray-500 flex flex-col gap-3'>
              <h3 className="font-medium text-gray-800 mb-1">Product Details</h3>
              
              <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">100% Original Products</p>
                  <p className="text-xs text-gray-500 mt-0.5">All products are sourced directly from brand or authorized channels</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Cash on Delivery Available</p>
                  <p className="text-xs text-gray-500 mt-0.5">Pay when you receive your order at your doorstep</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Flat ₹39 Delivery Fee</p>
                  <p className="text-xs text-gray-500 mt-0.5">Affordable delivery charges on all orders</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Easy 7-Day Exchange Policy</p>
                  <p className="text-xs text-gray-500 mt-0.5">Change sizes or products with ease within 7 days</p>
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* ---------- Description Section ------------- */}
      <div className='mt-20 max-w-7xl mx-auto px-4'>
        <div className='flex rounded-t-xl overflow-hidden'>
          <div className='border-b-2 border-purple-600 px-6 py-3 text-base font-medium text-purple-800 bg-gradient-to-r from-purple-50 to-indigo-50'>Product Description</div>
        </div>
        <div className='flex flex-col gap-4 border rounded-b-xl px-8 py-8 text-gray-600 bg-white'>
          <div className="space-y-4">
            {productData.description.split('\n').filter(point => point.trim() !== '').map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-1.5 bg-purple-100 rounded-full mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                </div>
                <p className="text-base">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --------- Related Products Section ---------- */}
      <div className="mt-20 max-w-7xl mx-auto px-4">
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>

    </div>
  ) : <div className='flex justify-center items-center h-80'>
        <svg className="animate-spin h-10 w-10 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
}

export default Product
