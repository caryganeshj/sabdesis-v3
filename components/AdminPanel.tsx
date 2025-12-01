import React, { useState, useRef } from 'react';
import { parseArtists, parseEvents, parseFile } from '../utils/parsing';

interface AdminPanelProps {
  onAddArtists: (artists: any[]) => void;
  onAddEvents: (events: any[]) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onAddArtists, onAddEvents }) => {
  const [activeTab, setActiveTab] = useState<'artist' | 'event'>('artist');
  const [textInput, setTextInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!textInput.trim()) return;

    if (activeTab === 'artist') {
      const parsed = parseArtists(textInput);
      onAddArtists(parsed);
    } else {
      const parsed = parseEvents(textInput);
      onAddEvents(parsed);
    }
    setTextInput('');
    setIsExpanded(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const text = await parseFile(e.target.files[0]);
        if (activeTab === 'artist') {
            onAddArtists(parseArtists(text));
        } else {
            onAddEvents(parseEvents(text));
        }
        setIsExpanded(false);
      } catch (err) {
        console.error("Failed to read file", err);
      }
    }
  };

  if (!isExpanded) {
    return (
      <button 
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-4 right-4 bg-saffron text-white p-3 rounded-full shadow-lg z-50 hover:bg-saffron-dark"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-warm-100 border-t-4 border-saffron shadow-2xl z-40 p-6 animate-slide-up max-h-[50vh] overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveTab('artist')}
              className={`px-4 py-2 rounded-lg font-serif ${activeTab === 'artist' ? 'bg-saffron text-white' : 'bg-white text-warm-800'}`}
            >
              Add Artist Bios
            </button>
            <button 
              onClick={() => setActiveTab('event')}
              className={`px-4 py-2 rounded-lg font-serif ${activeTab === 'event' ? 'bg-saffron text-white' : 'bg-white text-warm-800'}`}
            >
              Add Events
            </button>
          </div>
          <button onClick={() => setIsExpanded(false)} className="text-warm-500 hover:text-warm-900">
            Close
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-2">
            {activeTab === 'artist' 
              ? 'Enter each bio as a new line or block. First sentence will be used as the name.' 
              : 'Enter events. To feature an event in the banner, add **Featured** to the line.'}
          </p>
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-saffron focus:outline-none resize-none bg-white text-warm-900"
            placeholder={activeTab === 'artist' ? "Paste artist bios here..." : "Artist Name, Date, Venue..."}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          
          <div className="flex justify-between mt-4">
            <div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".txt"
                onChange={handleFileUpload}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 border border-saffron text-saffron rounded hover:bg-saffron hover:text-white transition"
              >
                Upload Document
              </button>
            </div>
            <button 
              onClick={handleSubmit}
              className="px-6 py-2 bg-saffron-dark text-white rounded font-bold hover:bg-saffron transition"
            >
              Submit Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
