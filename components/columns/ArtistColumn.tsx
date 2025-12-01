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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-warm-200 relative hover:shadow-md transition-shadow">
      {isAdmin && (
        <div className="absolute top-2 right-2 flex space-x-1 bg-white/90 p-1 rounded">
          <button onClick={onMoveUp} className="text-gray-400 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 3l-7 7h14l-7-7z"/></svg>
          </button>
          <button onClick={onMoveDown} className="text-gray-400 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 17l7-7H3l7 7z"/></svg>
          </button>
          <button onClick={onDelete} className="text-gray-400 hover:text-red-600 ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 001.5.06l.3-7.5z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      <h3 className="font-serif text-xl font-bold text-saffron-dark mb-2 pr-12">{artist.name}</h3>
      <p className="text-sm text-gray-700 leading-relaxed font-sans">
        {displayBio}
        {isLong && !showFull && (
           <button 
             onClick={() => setShowFull(true)}
             className="text-saffron-dark font-bold ml-1 hover:underline text-xs"
           >
             more...
           </button>
        )}
      </p>

      {/* Pop up modal for full bio if desired, or just inline expansion as implemented above. 
          Prompt asks for "pop-up with full details". Implementing simple modal logic below. */}
      {showFull && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
            <div className="bg-warm-50 p-6 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto border-2 border-saffron">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-2xl font-bold text-saffron-dark">{artist.name}</h3>
                    <button onClick={(e) => { e.stopPropagation(); setShowFull(false); }} className="text-gray-500 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">{artist.bio}</p>
            </div>
        </div>
      )}
    </div>
  );
};

export const ArtistColumn: React.FC<ArtistColumnProps> = ({ artists, isAdmin, onDelete, onMove }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-warm-800 border-b-2 border-saffron/30 pb-2 mb-2">Artists</h2>
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
