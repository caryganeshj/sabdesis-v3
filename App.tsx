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
  const [events, setEvents] = useState<Event[]>([]); 
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
        <div className="placeholder-page">
          <div className="placeholder-box">
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>{currentPage}</h2>
            <p style={{ fontStyle: 'italic', color: 'var(--color-warm-text-light)' }}>{PAGE_PLACEHOLDERS[currentPage]}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="content-container">
        <div className="columns-layout">
          {/* Left Column */}
          <div className="col-side">
            <ArtistColumn 
              artists={artists} 
              isAdmin={isAdmin}
              onDelete={handleDeleteArtist}
              onMove={handleMoveArtist}
            />
          </div>

          {/* Middle Column */}
          <div className="col-center">
            <EventColumn 
              events={events}
              isAdmin={isAdmin}
              onDelete={handleDeleteEvent}
              onToggleFeatured={handleToggleFeatured}
            />
          </div>

          {/* Right Column */}
          <div className="col-side">
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
      {currentPage === PageType.MUSIC && <Banner events={events} />}
      
      {renderContent()}

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