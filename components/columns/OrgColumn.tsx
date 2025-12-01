import React from 'react';
import { Organization } from '../../types';

interface OrgColumnProps {
  orgs: Organization[];
  isAdmin: boolean;
  onDelete: (id: string) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
}

const OrgTile: React.FC<{
    org: Organization,
    isAdmin: boolean,
    onDelete: () => void,
    onMoveUp: () => void,
    onMoveDown: () => void
}> = ({ org, isAdmin, onDelete, onMoveUp, onMoveDown }) => (
    <div className="tile">
        {isAdmin && (
            <div className="tile-actions">
                <button onClick={onMoveUp} className="icon-btn move">
                    <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="currentColor" viewBox="0 0 20 20"><path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"/></svg>
                </button>
                <button onClick={onMoveDown} className="icon-btn move">
                    <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </button>
                <button onClick={onDelete} className="icon-btn delete">
                    <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                </button>
            </div>
        )}
        <h4 className="org-name">{org.name}</h4>
        <p className="org-desc">{org.description}</p>
        <div className="org-contact">
            {org.website && <a href={`http://${org.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="org-link">{org.website}</a>}
            <div style={{ marginTop: '0.25rem' }}>{org.contact}</div>
        </div>
    </div>
);

export const OrgColumn: React.FC<OrgColumnProps> = ({ orgs, isAdmin, onDelete, onMove }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
       <h2 className="section-title">Directory</h2>
       {orgs.map((org, idx) => (
           <OrgTile 
             key={org.id} 
             org={org} 
             isAdmin={isAdmin}
             onDelete={() => onDelete(org.id)}
             onMoveUp={() => onMove(idx, 'up')}
             onMoveDown={() => onMove(idx, 'down')}
           />
       ))}
    </div>
  );
};