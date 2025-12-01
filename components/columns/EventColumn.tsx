import React from 'react';
import { Event } from '../../types';

interface EventColumnProps {
  events: Event[];
  isAdmin: boolean;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string) => void;
}

const CalendarWidget = () => {
    // Mock functional calendar header
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = new Date().getMonth();
    
    return (
        <div className="calendar-widget">
            <div className="calendar-header">
                <button style={{ padding: '0.25rem', cursor: 'pointer' }}>&lt;</button>
                <span>{months[currentMonth]} {new Date().getFullYear()}</span>
                <button style={{ padding: '0.25rem', cursor: 'pointer' }}>&gt;</button>
            </div>
            {/* Visual representation of days - static for preview */}
            <div className="calendar-grid">
                {['S','M','T','W','T','F','S'].map(d => <div key={d} className="day-label">{d}</div>)}
                {Array.from({length: 30}).map((_, i) => (
                    <div key={i} className={`day-cell ${i === 14 ? 'today' : ''}`}>
                        {i + 1}
                    </div>
                ))}
            </div>
        </div>
    )
}

const EventTile: React.FC<{ 
    event: Event, 
    isAdmin: boolean, 
    onDelete: () => void,
    onToggleFeatured: () => void 
}> = ({ event, isAdmin, onDelete, onToggleFeatured }) => (
    <div className={`tile ${event.isFeatured ? 'featured' : ''}`}>
        {isAdmin && (
            <div className="tile-actions">
                 <button 
                    onClick={onToggleFeatured} 
                    className={`icon-btn ${event.isFeatured ? 'active' : ''}`}
                    title="Toggle Featured"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: '1.25rem', height: '1.25rem' }}>
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>
                </button>
                <button onClick={onDelete} className="icon-btn delete">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: '1.25rem', height: '1.25rem' }}>
                         <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 001.5.06l.3-7.5z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        )}
        <h4 className="event-title">{event.title}</h4>
        <p className="event-subtitle">{event.artist}</p>
        <div className="event-meta">
             <span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '0.75rem', height: '0.75rem' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {event.date}
             </span>
             <span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '0.75rem', height: '0.75rem' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {event.venue}
             </span>
        </div>
        <p className="tile-text" style={{ marginBottom: '0.75rem' }}>{event.description}</p>
        <button className="btn-register">
            Register Now
        </button>
    </div>
);

export const EventColumn: React.FC<EventColumnProps> = ({ events, isAdmin, onDelete, onToggleFeatured }) => {
  return (
    <div>
        <h2 className="section-title">Events Calendar</h2>
        <CalendarWidget />
        <div>
            {events.length > 0 ? events.map(event => (
                <EventTile 
                    key={event.id} 
                    event={event} 
                    isAdmin={isAdmin}
                    onDelete={() => onDelete(event.id)}
                    onToggleFeatured={() => onToggleFeatured(event.id)}
                />
            )) : (
                <div className="empty-state">No events scheduled.</div>
            )}
        </div>
    </div>
  );
};