import { Artist, Event, Organization } from '../types';

const uid = () => Math.random().toString(36).substr(2, 9);

export const parseArtists = (text: string): Artist[] => {
  // Extract content between ** ** if present, otherwise split by double newlines
  const matches = text.match(/\*\*(.*?)\*\*/gs);
  
  let rawBlocks: string[] = [];
  if (matches && matches.length > 0) {
    rawBlocks = matches.map(m => m.replace(/\*\*/g, '').trim());
  } else {
    rawBlocks = text.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
  }

  return rawBlocks.map(block => {
    // Heuristic: First 5 words or up to the first verb is the name
    // For specific prompt data, we can split by first sentence or " is "
    const firstSentence = block.split('.')[0];
    let name = firstSentence;
    if (name.length > 30) {
        // Fallback if sentence is too long, take first 4 words
        name = block.split(' ').slice(0, 4).join(' ');
    }
    
    // Attempt to extract name more intelligently based on prompt data structure
    // e.g. "Smt Purvi Patel is..." -> Name: Smt Purvi Patel
    const verbMatch = block.match(/\s(is|began|has|was)\s/);
    if (verbMatch && verbMatch.index) {
        const potentialName = block.substring(0, verbMatch.index).trim();
        if (potentialName.length < 50) {
            name = potentialName;
        }
    }

    return {
      id: uid(),
      name: name,
      bio: block
    };
  });
};

export const parseEvents = (text: string): Event[] => {
  const lines = text.split(/\n+/).filter(l => l.trim().length > 0);
  const events: Event[] = [];

  // If text has **Featured**, we treat it line by line or block by block
  // Assuming 1 line per event or block separated. 
  // For this generic parser, we assume each non-empty line might be an event description
  
  lines.forEach(line => {
    const isFeatured = line.includes('**Featured**');
    const cleanLine = line.replace('**Featured**', '').replace(/\*\*/g, '').trim();
    
    // Heuristic parsing for "Artist name, date, venue"
    // This is very loose as freeform text is unpredictable
    const parts = cleanLine.split(',');
    
    let artist = "Unknown Artist";
    let date = "Date TBD";
    let venue = "Venue TBD";
    
    if (parts.length >= 3) {
        artist = parts[0].trim();
        date = parts[1].trim();
        venue = parts.slice(2).join(',').trim();
    } else if (parts.length === 2) {
        artist = parts[0].trim();
        date = parts[1].trim();
    } else {
        artist = cleanLine.substring(0, 30) + "...";
    }

    events.push({
        id: uid(),
        title: `${artist} Live`,
        artist,
        date,
        venue,
        description: cleanLine,
        isFeatured,
        registrationLink: '#'
    });
  });

  return events;
};

export const parseFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
};
