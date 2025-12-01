import React, { useState } from 'react';
import { Artist } from '../../types';

interface ArtistColumnProps {
  artists: Artist[];
  isAdmin: boolean;
  onDelete: (id: string) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
}

const ArtistTile: React.FC<{ 
    artist: Artist, 
    isAdmin: boolean, 
    onDelete: () => void,
    onMoveUp: () => void,
    onMoveDown: () => void
}> = ({ artist, isAdmin, onDelete, onMoveUp, onMoveDown }) => {
  const [showFull, setShowFull] = useState(false);
  const isLong = artist.bio.length > 200;
  const displayBio = showFull ? artist.bio : (isLong ? `${artist.bio.substring(0, 200)}...` : artist.bio);

  return (
    <div className="tile">
      {isAdmin && (
        <div className="tile-actions">
          <button onClick={onMoveUp} className="icon-btn move">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: '1rem', height: '1rem' }}><path d="M10 3l-7 7h14l-7-7z"/></svg>
          </button>
          <button onClick={onMoveDown} className="icon-btn move">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: '1rem', height: '1rem' }}><path d="M10 17l7-7H3l7 7z"/></svg>
          </button>
          <button onClick={onDelete} className="icon-btn delete">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: '1rem', height: '1rem' }}>
              <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 001.5.06l.3-7.5z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      <h3 className="artist-name">{artist.name}</h3>
      <p className="tile-text">
        {displayBio}
        {isLong && !showFull && (
           <button 
             onClick={() => setShowFull(true)}
             className="more-link"
           >
             more...
           </button>
        )}
      </p>

      {/* Pop up modal for full bio */}
      {showFull && (
        <div className="modal-overlay">
            <div className="modal-content">
                <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-saffron-dark)' }}>{artist.name}</h3>
                    <button onClick={(e) => { e.stopPropagation(); setShowFull(false); }} className="modal-close">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <p style={{ color: '#374151', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{artist.bio}</p>
            </div>
        </div>
      )}
    </div>
  );
};

export const ArtistColumn: React.FC<ArtistColumnProps> = ({ artists, isAdmin, onDelete, onMove }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <h2 className="section-title">Artists</h2>
      {artists.map((artist, index) => (
        <ArtistTile 
          key={artist.id} 
          artist={artist} 
          isAdmin={isAdmin}
          onDelete={() => onDelete(artist.id)}
          onMoveUp={() => onMove(index, 'up')}
          onMoveDown={() => onMove(index, 'down')}
        />
      ))}
    </div>
  );
};