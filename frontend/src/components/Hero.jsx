import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

// Updated image array with male models only
const sliderImages = [
  { 
    src: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1", 
    alt: "Urban Style Men's Oversized Streetwear" 
  },
  { 
    src: "https://images.pexels.com/photos/1687719/pexels-photo-1687719.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1", 
    alt: "Streetwear Men's Fashion" 
  },
  { 
    src: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80", 
    alt: "Minimal Men's Streetwear Look" 
  },
  { 
    src: "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1", 
    alt: "Men's Urban Oversized Style" 
  },
  { 
    src: "https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80", 
    alt: "Men's Casual Oversized Fashion" 
  },
];

const Hero = () => {
  const { navigate } = useContext(ShopContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState([false, false, false, false, false]);
  
  // Preload all images when component mounts
  useEffect(() => {
    const preloadImages = () => {
      sliderImages.forEach((image, index) => {
        const img = new Image();
        img.src = image.src;
        img.onload = () => {
          setImagesLoaded(prev => {
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
          });
        };
        img.onerror = () => {
          console.error(`Failed to load image at index ${index}`);
        };
      });
    };
    
    preloadImages();
  }, []);
  
  // Auto-slide effect - only start after first image is loaded
  useEffect(() => {
    if (!imagesLoaded[0]) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 3000); // Change slide every 3 seconds
    
    return () => clearInterval(interval);
  }, [imagesLoaded]);
  
  const handleImageClick = () => {
    navigate('/collection');
  };
  
  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-md mb-6">
      {/* Slider */}
      <div 
        className="flex h-full transition-transform ease-out duration-700" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderImages.map((image, index) => (
          <div 
            key={index} 
            className="min-w-full h-full cursor-pointer relative"
            onClick={handleImageClick}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
              <p className="text-white font-semibold text-xl mb-10">Shop Collection</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slider indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            className={`h-2.5 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-6' : 'bg-white/50 w-2.5'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
      
      {/* Arrow controls */}
      <button 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full p-3 text-white transition-all"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
        }}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full p-3 text-white transition-all"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
        }}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Hero;
