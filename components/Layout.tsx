import React from 'react';
import { PageType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentPage, 
  onNavigate,
  isAdmin,
  onToggleAdmin
}) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-warm-50 text-warm-900">
      {/* Header */}
      <header className="bg-saffron text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-end gap-2">
            <h1 className="text-4xl font-serif font-bold tracking-wide">SabDesis</h1>
            <span className="text-sm font-light mb-1 opacity-90">Raleigh</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {Object.values(PageType).map((page) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`text-lg font-serif hover:text-warm-800 transition-colors ${
                  currentPage === page ? 'border-b-2 border-white font-bold' : ''
                }`}
              >
                {page}
              </button>
            ))}
          </nav>

          <div className="flex items-center">
            <button 
              onClick={onToggleAdmin}
              className={`text-xs px-3 py-1 rounded-full border ${
                isAdmin 
                  ? 'bg-white text-saffron border-white font-bold' 
                  : 'border-white/50 text-white/70 hover:text-white hover:border-white'
              }`}
            >
              {isAdmin ? 'Admin ON' : 'Admin'}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Bar (Simplified) */}
        <div className="md:hidden flex justify-around bg-saffron-dark py-2 overflow-x-auto">
          {Object.values(PageType).map((page) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`px-3 text-sm font-serif whitespace-nowrap ${
                 currentPage === page ? 'font-bold text-white' : 'text-white/80'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-warm-800 text-warm-100 py-8 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-serif text-lg text-saffron-light mb-2">About SabDesis</h3>
            <p className="opacity-80">Connecting the community through the rhythms and melodies of Indian Classical Music in Raleigh, NC.</p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-saffron-light mb-2">Links</h3>
            <ul className="space-y-1 opacity-80">
              <li><a href="#" className="hover:text-white">Credits</a></li>
              <li><a href="#" className="hover:text-white">Acknowledgements</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="text-right flex flex-col justify-end">
            <p className="opacity-60">&copy; {new Date().getFullYear()} SabDesis Portal.</p>
            <p className="opacity-60 text-xs mt-1">Designed with warmth.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
