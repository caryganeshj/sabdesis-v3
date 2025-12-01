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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-warm-200 relative mb-4">
        {isAdmin && (
            <div className="absolute top-2 right-2 flex space-x-1 bg-white/90 p-1 rounded">
                <button onClick={onMoveUp} className="text-gray-400 hover:text-blue-600">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"/></svg>
                </button>
                <button onClick={onMoveDown} className="text-gray-400 hover:text-blue-600">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </button>
                <button onClick={onDelete} className="text-gray-400 hover:text-red-600 ml-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                </button>
            </div>
        )}
        <h4 className="font-serif font-bold text-md text-saffron-dark mb-1">{org.name}</h4>
        <p className="text-xs text-gray-600 mb-2 leading-tight">{org.description}</p>
        <div className="text-xs text-warm-800 font-semibold border-t border-warm-100 pt-2">
            {org.website && <div className="truncate text-blue-600 underline cursor-pointer">{org.website}</div>}
            <div className="mt-1">{org.contact}</div>
        </div>
    </div>
);

export const OrgColumn: React.FC<OrgColumnProps> = ({ orgs, isAdmin, onDelete, onMove }) => {
  return (
    <div className="flex flex-col">
       <h2 className="text-lg font-bold text-warm-800 border-b-2 border-saffron/30 pb-2 mb-2">Directory</h2>
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
