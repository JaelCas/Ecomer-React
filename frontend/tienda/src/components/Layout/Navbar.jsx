import { useState } from 'react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

function Navbar() {
    const [cartCount, setCartCount] = useState(0);
    const [mobileMenuOpen, setMobileMenuOPen] = useState(false);
    return (
        <header className='bg-white shadow-lg sticky top-0 z-50'>
            <nav className='container mx-auto px-4 py-4'>
                <div className='flex justify-between items-center'>
                    {/* Logo */}
                    <div className='flex items-center'>
                        <div className='bg-linear-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg mr-3'>
                            <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                                <path d="M3 4a1 10 011-1h12al 10011 1v2al 10 01-1 1H4al 10 01-1-1V4zM3 10a1 1 0 011-1h6al 10 011 1v6al 1 0 01-1 1H4al 10 01-1-1v-6zM14 9a1 10 00-1 1v6al 10 001 1h2al 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                            </svg>
                        </div>
                        <h1 className='text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                            TechStore Pro 
                        </h1>
                    </div>
                    {/* Desktop Menu */}
                    <div className='hidden md:flex space-x-6'>
                        <a href="#" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group'>
                            Inicio 
                            <span className='absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600'></span>
                        </a>
                        <a href="#" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group'>
                            Productos 
                            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600'></span>
                        </a>
                        <a href="#" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group'>
                            Categorías
                            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600'></span>
                        </a>
                        <a href="#" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group'>
                            Contacto
                            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600'></span>
                        </a>
                    </div>
                    {/* Cart and login Icons */}
                    <div className='flex items-center space-x-2'>
                        {/* Cart Icon */}
                        <a href="#" className='relative group p-2.5 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 transform hover:scale-105'>
                            <ShoppingCart className='w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-all duration-300 group-hover:rotate-3'/>
                            {cartCount > 0 && (
                               <span className="absolute-top-2-right-2 bg-linear-to-r from-red-500 via-pink-500 to-red-600 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1 shadow-lg border-2 border-white animate-pulse">
                                {cartCount}
                                </span>
                            )}
                        </a>
                        {/* Login Icon */}
                        <a href="" className='relative group p-2.5 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 transform hover:scale-105'>
                            <User className='w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-all duration-300'/>
                        </a>

                        {/* Mobile menu botton */}
                        <button onClick={()=> setMobileMenuOPen(!mobileMenuOpen)} className='md:hidden p-2.5 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300'>
                            {mobileMenuOpen ? (
                                <X className='w-6 h-6 text-gray-700'/>
                            ) : (
                                <Menu className='w-6 h-6 text-gray-700'/>
                            )}
                        </button>
                    </div>
                </div>
                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className='md:hidden mt-4 py-4 border-t border-gray-200 animate-in slide-in from-top duration-300'>
                        <div className='flex flex-col space-y-4'>
                            <a href="#" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2'>
                                Inicio 
                            </a>
                            <a href="#" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2'>
                                Productos 
                            </a>
                            <a href="#" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2'>
                                Categorías 
                            </a>
                            <a href="#" className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2'>
                                Contacto 
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
export default Navbar;