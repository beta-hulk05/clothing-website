import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch, products } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isVoiceActive, setIsVoiceActive] = useState(false);
    const inputRef = useRef(null);
    const searchContainerRef = useRef(null);
    const location = useLocation();

    // Generate search suggestions based on current input
    useEffect(() => {
        if (search && search.length > 1 && products?.length) {
            const filteredProducts = products
                .filter(product => 
                    product.name.toLowerCase().includes(search.toLowerCase()) || 
                    product.category.toLowerCase().includes(search.toLowerCase())
                )
                .slice(0, 5); // Limit to 5 suggestions
            setSuggestions(filteredProducts);
        } else {
            setSuggestions([]);
        }
    }, [search, products]);

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
            if (showSearch && inputRef.current) {
                inputRef.current.focus();
            }
        } else {
            setVisible(false);
        }
    }, [location, showSearch]);
    
    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setSuggestions([]);
                setIsFocused(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    // Handle keyboard shortcut for search
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '/' && !e.target.closest('input, textarea')) {
                e.preventDefault();
                setShowSearch(true);
                setTimeout(() => inputRef.current?.focus(), 100);
            }
            if (e.key === 'Escape') {
                setShowSearch(false);
            }
        };
        
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [setShowSearch]);

    const handleClearSearch = () => {
        setSearch('');
        inputRef.current.focus();
    };

    const handleVoiceSearch = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Voice search is not supported in your browser');
            return;
        }

        setIsVoiceActive(true);

        const SpeechRecognition = window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'en-US';
        recognition.start();
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setSearch(transcript);
            setIsVoiceActive(false);
        };
        
        recognition.onerror = () => {
            setIsVoiceActive(false);
        };
        
        recognition.onend = () => {
            setIsVoiceActive(false);
        };
    };
    
    return showSearch && visible ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-center pt-20 animate-fadeIn">
            <div 
                ref={searchContainerRef}
                className="w-[90%] max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all"
                style={{animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'}}
            >
                {/* Search Header */}
                <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-indigo-50">
                    <div className="font-medium text-gray-700 mb-2 flex justify-between">
                        <span>Search Products</span>
                        <button 
                            onClick={() => setShowSearch(false)}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Search Input */}
                <div className={`relative px-4 py-3 flex items-center gap-3 ${isFocused ? 'bg-purple-50' : 'bg-white'} transition-colors`}>
                    <div className={`flex items-center justify-center h-10 w-10 rounded-full ${isFocused ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'} transition-colors`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        ref={inputRef}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        className="flex-1 bg-transparent text-lg outline-none placeholder:text-gray-400 text-gray-800"
                        type="text"
                        placeholder="What are you looking for today?"
                    />
                    <div className="flex items-center gap-2">
                        {search && (
                            <button
                                onClick={handleClearSearch}
                                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                        <button
                            onClick={handleVoiceSearch}
                            className={`h-8 w-8 flex items-center justify-center rounded-full transition-colors ${isVoiceActive ? 'bg-red-100 text-red-500 animate-pulse' : 'hover:bg-gray-100 text-gray-500'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Search Suggestions */}
                {suggestions.length > 0 && (
                    <div className="max-h-80 overflow-y-auto">
                        <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500">Suggestions</div>
                        <div className="divide-y">
                            {suggestions.map((product) => (
                                <div 
                                    key={product._id} 
                                    className="px-4 py-2 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors"
                                    onClick={() => navigate(`/product/${product._id}`)}
                                >
                                    <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                                        <img 
                                            src={product.image[0]} 
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">{product.name}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500">{product.category}</span>
                                            <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                                            <span className="text-sm font-medium text-purple-600">₹{product.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quick Filters */}
                {!suggestions.length && search.length === 0 && (
                    <div className="px-4 py-6">
                        <p className="text-sm text-gray-500 mb-3">Popular categories</p>
                        <div className="flex flex-wrap gap-2">
                            {['Men', 'Women', 'Kids', 'Topwear', 'Bottomwear', 'Winterwear'].map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSearch(category)}
                                    className="px-3 py-1 rounded-full bg-gray-100 hover:bg-purple-100 hover:text-purple-700 text-sm text-gray-700 transition-colors"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Search Footer */}
                <div className="p-3 bg-gray-50 text-xs text-gray-500 text-center border-t">
                    Press <kbd className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-600 font-sans mx-1">ESC</kbd> to close or 
                    <kbd className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-600 font-sans mx-1">/</kbd> to search anytime
                </div>
            </div>
        </div>
    ) : null;
}

export default SearchBar
