import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { AppRoute, PublicRoute } from '../appRoutes';
import logo from '../assets/logo.png';

interface NavigationProps {
  currentPage: AppRoute;
  onNavigate: (page: AppRoute) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { id: PublicRoute; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="flex items-center gap-3">
              <img src={logo} alt="Martamora General Dealers logo" className="h-12 w-12 rounded-lg object-contain" />
              <div>
                <h1 className="text-xl font-bold text-brown-700" style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}>
                  Martamora
                </h1>
                <p className="text-xs text-gray-600 uppercase tracking-wide" style={{ fontFamily: 'Calibri, sans-serif' }}>
                  General Dealers
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  currentPage === item.id
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-700 hover:text-green-600'
                }`}
                style={{ fontFamily: 'Calibri, sans-serif' }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-green-600 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                style={{ fontFamily: 'Calibri, sans-serif' }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
