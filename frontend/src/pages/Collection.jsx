import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0 ) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(()=>{
      applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter Options */}
      <div className='min-w-60'>
        <div className='flex items-center justify-between mb-4'>
          <p onClick={()=>setShowFilter(!showFilter)} className='text-xl flex items-center cursor-pointer gap-2 font-medium text-gray-800'>
            <span>Filters</span>
            <img className={`h-3 sm:hidden transition-transform duration-200 ${showFilter ? 'rotate-180' : ''}`} src={assets.dropdown_icon} alt="" />
          </p>
          
          {(category.length > 0 || subCategory.length > 0) && (
            <button 
              onClick={() => {setCategory([]); setSubCategory([])}} 
              className='text-xs px-2 py-1 text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100 transition-all'
            >
              Clear All
            </button>
          )}
        </div>
        
        {/* Category Filter */}
        <div className={`bg-white rounded-lg shadow-sm px-5 py-4 mt-4 ${showFilter ? '' :'hidden'} sm:block transition-all duration-300 hover:shadow-md`}>
          <p className='mb-3 text-sm font-medium text-gray-800'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700'>
            {['Men', 'Women', 'Kids'].map(item => (
              <label key={item} className='flex items-center gap-2 cursor-pointer hover:text-purple-700 transition-colors'>
                <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                  category.includes(item) ? 'bg-purple-600 border-purple-600' : 'border-gray-400'
                }`}>
                  {category.includes(item) && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <input className='hidden' type="checkbox" value={item} onChange={toggleCategory} checked={category.includes(item)} />
                {item}
              </label>
            ))}
          </div>
        </div>
        
        {/* SubCategory Filter */}
        <div className={`bg-white rounded-lg shadow-sm px-5 py-4 mt-4 ${showFilter ? '' :'hidden'} sm:block transition-all duration-300 hover:shadow-md`}>
          <p className='mb-3 text-sm font-medium text-gray-800'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map(item => (
              <label key={item} className='flex items-center gap-2 cursor-pointer hover:text-purple-700 transition-colors'>
                <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                  subCategory.includes(item) ? 'bg-purple-600 border-purple-600' : 'border-gray-400'
                }`}>
                  {subCategory.includes(item) && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <input className='hidden' type="checkbox" value={item} onChange={toggleSubCategory} checked={subCategory.includes(item)} />
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between mb-6 items-center'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            
            {/* Product Sort */}
            <div className="relative">
              <select 
                onChange={(e)=>setSortType(e.target.value)} 
                className='border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-sm rounded-lg py-2 pl-3 pr-8 bg-white transition-all appearance-none'
              >
                <option value="relavent">Sort by: Relavent</option>
                <option value="low-high">Sort by: Price Low to High</option>
                <option value="high-low">Sort by: Price High to Low</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
        </div>

        {/* Map Products */}
        {filterProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-500 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-xl font-medium">No products found</p>
            <p className="mt-2">Try changing your filter criteria</p>
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {filterProducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Collection
