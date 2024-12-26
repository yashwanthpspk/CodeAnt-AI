import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Link, useLocation } from 'react-router-dom';
import { Home, Code2, Cloud, HelpCircle, Settings, Phone, LogOut, X } from 'lucide-react';
import images from '../../constants/images';
import { useState, useEffect } from 'react';

export function Sidebar({ isOpen, onClose, className }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
    const handleMouseMove = (event) => {
      const links = document.querySelectorAll('nav a');
      links.forEach(link => {
        const rect = link.getBoundingClientRect();
        if (event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom) {
          setActiveLink(link.getAttribute('href'));
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 
          w-[240px] bg-white
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:transform-none
          ${className}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Mobile header with close button */}
          <div className="flex items-center justify-between p-4 lg:hidden">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative h-8 w-8">
                {!imageError ? (
                  <img 
                    src={images.codeant}
                    alt="CodeAnt AI Logo" 
                    className="h-8 w-8 object-contain"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="h-8 w-8 bg-primary/10 rounded-md flex items-center justify-center">
                    <Code2 className="h-5 w-5" />
                  </div>
                )}
              </div>
              <span className="text-xl font-semibold">CodeAnt AI</span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-300 rounded-lg"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Desktop Logo Section */}
          <div className="hidden lg:block p-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative h-8 w-8">
                {!imageError ? (
                  <img 
                    src={images.codeant}
                    alt="CodeAnt AI Logo" 
                    className="h-8 w-8 object-contain"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="h-8 w-8 bg-primary/10 rounded-md flex items-center justify-center">
                    <Code2 className="h-5 w-5" />
                  </div>
                )}
              </div>
              <span className="text-xl font-semibold">CodeAnt AI</span>
            </Link>
          </div>

          {/* User Section */}
          <div className="px-3 mb-2">
            <button className="w-full px-3 py-2 rounded-lg text-left bg-gray-50 hover:bg-blue-300">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{user?.name}</span>
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 px-3 space-y-0.5">
            <Link
              to="/"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${
                activeLink === "/" 
                  ? "bg-blue-600 text-white" 
                  : "text-black hover:bg-blue-300"
              }`}
              onClick={onClose}
            >
              <Home className="h-[18px] w-[18px]" />
              Repositories
            </Link>

            <Link
              to="/code-review"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-black hover:bg-blue-300"
              onClick={onClose}
            >
              <Code2 className="h-[18px] w-[18px]" />
              AI Code Review
            </Link>

            <Link
              to="/security"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-black hover:bg-blue-300"
              onClick={onClose}
            >
              <Cloud className="h-[18px] w-[18px]" />
              Cloud Security
            </Link>

            <Link
              to="/help"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-black hover:bg-blue-300"
              onClick={onClose}
            >
              <HelpCircle className="h-[18px] w-[18px]" />
              How to Use
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-black hover:bg-blue-300"
              onClick={onClose}
            >
              <Settings className="h-[18px] w-[18px]" />
              Settings
            </Link>
          </nav>

          {/* Bottom Section */}
          <div className="px-3 py-4 space-y-0.5">
            <Link
              to="/support"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-black hover:bg-green-300"
              onClick={onClose}
            >
              <Phone className="h-[18px] w-[18px]" />
              Support
            </Link>

            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-300"
            >
              <LogOut className="h-[18px] w-[18px]" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

