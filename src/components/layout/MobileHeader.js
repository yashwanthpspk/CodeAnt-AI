import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import images from '../../constants/images';

export function MobileHeader({ onMenuClick }) {
  return (
    <div className="flex items-center justify-between p-4 border-b lg:hidden bg-white">
      <Link to="/" className="flex items-center gap-3">
        <img 
          src={images.codeant}
          alt="CodeAnt AI Logo" 
          className="h-8 w-8 object-contain"
        />
        <span className="text-xl font-semibold">CodeAnt AI</span>
      </Link>
      <button
        onClick={onMenuClick}
        className="p-2 hover:bg-gray-100 rounded-lg"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>
    </div>
  );
}

