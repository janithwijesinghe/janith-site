import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-20 pt-2">
          <Link to="/" className="flex items-center">
           <img
  src="/logo.png"
  alt="Logo"
  className="h-14 md:h-20 object-contain"
/>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Services
            </button>
            <Link
              to="/portfolio"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Portfolio
            </Link>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all transform hover:scale-105"
            >
              Get in Touch
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-gray-300 hover:text-white py-2"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-gray-300 hover:text-white py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left text-gray-300 hover:text-white py-2"
            >
              Services
            </button>
            <Link
              to="/portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white py-2"
            >
              Portfolio
            </Link>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-gray-300 hover:text-white py-2"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full w-full"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
