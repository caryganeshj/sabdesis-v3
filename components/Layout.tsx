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
    <div className="app-container">
      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <div className="logo-area">
            <h1 className="logo-title">SabDesis</h1>
            <span className="logo-subtitle">Raleigh</span>
          </div>
          
          <nav className="main-nav">
            {Object.values(PageType).map((page) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`nav-link ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              onClick={onToggleAdmin}
              className={`admin-badge ${isAdmin ? 'active' : ''}`}
            >
              {isAdmin ? 'Admin ON' : 'Admin'}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Bar */}
        <div className="mobile-nav">
          {Object.values(PageType).map((page) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`mobile-nav-link ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <h3 className="footer-title">About SabDesis</h3>
            <p style={{ opacity: 0.8, lineHeight: 1.5 }}>Connecting the community through the rhythms and melodies of Indian Classical Music in Raleigh, NC.</p>
          </div>
          <div>
            <h3 className="footer-title">Links</h3>
            <ul className="footer-links">
              <li><a href="#">Credits</a></li>
              <li><a href="#">Acknowledgements</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <p style={{ opacity: 0.6 }}>&copy; {new Date().getFullYear()} SabDesis Portal.</p>
            <p style={{ opacity: 0.6, fontSize: '0.75rem', marginTop: '0.25rem' }}>Designed with warmth.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};