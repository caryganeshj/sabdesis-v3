import React, { useState, useEffect } from 'react';
import { Event } from '../types';

interface BannerProps {
  events: Event[];
}

export const Banner: React.FC<BannerProps> = ({ events }) => {
  const featuredEvents = events.filter(e => e.isFeatured).slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (featuredEvents.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, featuredEvents.length]);

  const handleNext = () => {
    setFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
      setFading(false);
    }, 500); // fade duration
  };

  const handlePrev = () => {
    setFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
      setFading(false);
    }, 500);
  };

  if (featuredEvents.length === 0) {
    return (
      <div className="banner-section" style={{ justifyContent: 'center' }}>
        <h2 className="banner-welcome">
          Welcome to SabDesis!
        </h2>
      </div>
    );
  }

  const currentEvent = featuredEvents[currentIndex];

  return (
    <div className="banner-section">
      {/* Left Arrow */}
      <button onClick={handlePrev} className="banner-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Content */}
      <div 
        className="banner-content"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <div className="banner-card">
            <h3 className="banner-artist">{currentEvent.artist}</h3>
            <div className="banner-meta">
                <span>{currentEvent.date}</span>
                <span>&bull;</span>
                <span>{currentEvent.venue}</span>
            </div>
            {currentEvent.description && (
                <p className="banner-desc">{currentEvent.description}</p>
            )}
        </div>
      </div>

      {/* Right Arrow */}
      <button onClick={handleNext} className="banner-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dots */}
      <div className="banner-dots">
        {featuredEvents.map((_, idx) => (
            <div 
                key={idx} 
                className={`dot ${idx === currentIndex ? 'active' : ''}`} 
            />
        ))}
      </div>
    </div>
  );
};