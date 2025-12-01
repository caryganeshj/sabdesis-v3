export interface Artist {
  id: string;
  name: string;
  bio: string;
}

export interface Event {
  id: string;
  title: string; // usually derived from Artist + Venue
  artist: string;
  date: string; // ISO or string representation
  venue: string;
  description: string;
  isFeatured: boolean;
  registrationLink?: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  contact: string;
  website?: string;
}

export enum PageType {
  MUSIC = 'Music',
  TALK = 'Talk',
  YOGA = 'Yoga',
  CLASSIFIEDS = 'Classifieds'
}
