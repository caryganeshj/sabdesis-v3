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
      <div className="h-[15vh] bg-mango flex items-center justify-center shadow-inner">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-saffron-dark animate-pulse">
          Welcome to SabDesis!
        </h2>
      </div>
    );
  }

  const currentEvent = featuredEvents[currentIndex];

  return (
    <div className="h-[15vh] bg-mango relative flex items-center justify-between px-4 shadow-inner group">
      {/* Left Arrow */}
      <button 
        onClick={handlePrev}
        className="z-10 p-2 rounded-full bg-white/30 hover:bg-white/50 text-saffron-dark transition-opacity opacity-0 group-hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Content */}
      <div 
        className={`flex-1 flex flex-col items-center justify-center text-center transition-opacity duration-500 ease-in-out ${fading ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="bg-white/80 px-6 py-2 rounded-lg shadow-sm border-l-4 border-saffron-dark">
            <h3 className="text-2xl font-serif font-bold text-warm-900">{currentEvent.artist}</h3>
            <div className="flex gap-4 justify-center text-sm font-semibold text-warm-800 mt-1">
                <span>{currentEvent.date}</span>
                <span>&bull;</span>
                <span>{currentEvent.venue}</span>
            </div>
            {currentEvent.description && (
                <p className="text-xs mt-1 italic text-warm-700 max-w-2xl truncate">{currentEvent.description}</p>
            )}
        </div>
      </div>

      {/* Right Arrow */}
      <button 
        onClick={handleNext}
        className="z-10 p-2 rounded-full bg-white/30 hover:bg-white/50 text-saffron-dark transition-opacity opacity-0 group-hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredEvents.map((_, idx) => (
            <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-saffron-dark' : 'bg-white/50'}`} 
            />
        ))}
      </div>
    </div>
  );
};
