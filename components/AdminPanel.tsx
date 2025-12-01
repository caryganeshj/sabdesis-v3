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
        className="admin-toggle-btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    );
  }

  return (
    <div className="admin-drawer">
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="admin-header">
          <div className="admin-tabs">
            <button 
              onClick={() => setActiveTab('artist')}
              className={`tab-btn ${activeTab === 'artist' ? 'active' : 'inactive'}`}
            >
              Add Artist Bios
            </button>
            <button 
              onClick={() => setActiveTab('event')}
              className={`tab-btn ${activeTab === 'event' ? 'active' : 'inactive'}`}
            >
              Add Events
            </button>
          </div>
          <button onClick={() => setIsExpanded(false)} style={{ color: '#6b7280' }}>
            Close
          </button>
        </div>

        <div className="admin-content">
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            {activeTab === 'artist' 
              ? 'Enter each bio as a new line or block. First sentence will be used as the name.' 
              : 'Enter events. To feature an event in the banner, add **Featured** to the line.'}
          </p>
          <textarea
            className="admin-textarea"
            placeholder={activeTab === 'artist' ? "Paste artist bios here..." : "Artist Name, Date, Venue..."}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          
          <div className="admin-actions">
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
                className="btn-upload"
              >
                Upload Document
              </button>
            </div>
            <button 
              onClick={handleSubmit}
              className="btn-submit"
            >
              Submit Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};