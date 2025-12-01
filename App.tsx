import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Banner } from './components/Banner';
import { AdminPanel } from './components/AdminPanel';
import { ArtistColumn } from './components/columns/ArtistColumn';
import { EventColumn } from './components/columns/EventColumn';
import { OrgColumn } from './components/columns/OrgColumn';
import { Artist, Event, Organization, PageType } from './types';
import { INITIAL_ARTISTS, INITIAL_ORGS, PAGE_PLACEHOLDERS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>(PageType.MUSIC);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Data State
  const [artists, setArtists] = useState<Artist[]>(INITIAL_ARTISTS);
  const [events, setEvents] = useState<Event[]>([]); // Start empty or add dummies if needed
  const [orgs, setOrgs] = useState<Organization[]>(INITIAL_ORGS);

  // --- Handlers ---

  const handleToggleAdmin = () => setIsAdmin(prev => !prev);

  // Artist Handlers
  const handleAddArtists = (newArtists: Artist[]) => {
    setArtists(prev => [...prev, ...newArtists]);
  };
  const handleDeleteArtist = (id: string) => {
    setArtists(prev => prev.filter(a => a.id !== id));
  };
  const handleMoveArtist = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === artists.length - 1)) return;
    const newArr = [...artists];
    const swapIdx = direction === 'up' ? index - 1 : index + 1;
    [newArr[index], newArr[swapIdx]] = [newArr[swapIdx], newArr[index]];
    setArtists(newArr);
  };

  // Event Handlers
  const handleAddEvents = (newEvents: Event[]) => {
    setEvents(prev => [...prev, ...newEvents]);
  };
  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };
  const handleToggleFeatured = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, isFeatured: !e.isFeatured } : e));
  };

  // Org Handlers
  const handleDeleteOrg = (id: string) => {
    setOrgs(prev => prev.filter(o => o.id !== id));
  };
  const handleMoveOrg = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === orgs.length - 1)) return;
    const newArr = [...orgs];
    const swapIdx = direction === 'up' ? index - 1 : index + 1;
    [newArr[index], newArr[swapIdx]] = [newArr[swapIdx], newArr[index]];
    setOrgs(newArr);
  };

  // Render Content based on Page Type
  const renderContent = () => {
    if (currentPage !== PageType.MUSIC) {
      return (
        <div className="flex-grow flex items-center justify-center min-h-[50vh] bg-warm-50">
          <div className="text-center p-8 border-2 border-dashed border-saffron rounded-xl bg-white/50">
            <h2 className="text-2xl font-serif text-warm-900 mb-4">{currentPage}</h2>
            <p className="text-warm-700 italic">{PAGE_PLACEHOLDERS[currentPage]}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8 h-full">
        <div className="flex flex-col md:flex-row gap-6 h-full">
          {/* Left Column - 20% */}
          <div className="w-full md:w-1/5">
            <ArtistColumn 
              artists={artists} 
              isAdmin={isAdmin}
              onDelete={handleDeleteArtist}
              onMove={handleMoveArtist}
            />
          </div>

          {/* Middle Column - 60% */}
          <div className="w-full md:w-3/5">
            <EventColumn 
              events={events}
              isAdmin={isAdmin}
              onDelete={handleDeleteEvent}
              onToggleFeatured={handleToggleFeatured}
            />
          </div>

          {/* Right Column - 20% */}
          <div className="w-full md:w-1/5">
            <OrgColumn 
              orgs={orgs}
              isAdmin={isAdmin}
              onDelete={handleDeleteOrg}
              onMove={handleMoveOrg}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout 
      currentPage={currentPage} 
      onNavigate={setCurrentPage} 
      isAdmin={isAdmin} 
      onToggleAdmin={handleToggleAdmin}
    >
      {/* Banner takes 15% of viewport approx, handled in component styles */}
      {currentPage === PageType.MUSIC && <Banner events={events} />}
      
      {renderContent()}

      {/* Admin Panel Drawer */}
      {isAdmin && (
        <AdminPanel 
          onAddArtists={handleAddArtists}
          onAddEvents={handleAddEvents}
        />
      )}
    </Layout>
  );
};

export default App;
