import { Artist, Organization, PageType } from './types';

// Helper to create IDs
const uid = () => Math.random().toString(36).substr(2, 9);

export const INITIAL_ARTISTS: Artist[] = [
  {
    id: uid(),
    name: 'Smt Purvi Patel',
    bio: 'Smt Purvi Patel is a holder of the Sangeet Visharad (BA in Music). She is a devoted disciple of Padma Shri Ustad Shahid Parvez Khan. Purvi’s musical journey began at a very young age under the guidance of her father, Shri Jagdishchandra Patel, a Sangeet Praveen and disciple of Ustad Shahid Parvez Khan. This deep-rooted musical legacy has shaped her artistry and commitment to Indian classical music. Based in Cary, North Carolina, Purvi balances her career as an IT professional with her devotion to music. She continues to perform regularly and collaborate with artists both in the U.S. and India, always seeking to grow and share the beauty of classical music. Purvi teaches sitar as faculty at the SPK Academy of Music, sharing her love and passion for the instrument with the next generation of students.'
  },
  {
    id: uid(),
    name: 'VW Chitnis',
    bio: 'VW Chitnis began learning Sitar at the age of 15. He received his training at the Ali Akbar College of Music under the guidance of Ustad Ali Akbar Khan. He is the founder of North Carolina Raga Revival as well as a School of Rag Indian Music Academy located in Raleigh NC and Brooklyn NY. He has received training on the Indian violin instruments, dilruba and esraj by the late Sarangi Maestro Pt Ramesh Misra. He lives in Raleigh NC with his wife Jill Taylor and daughter Nikhila Chitnis.'
  },
  {
    id: uid(),
    name: 'Sejal Vaidya',
    bio: 'Sejal Vaidya is a highly accomplished Hindustani classical vocalist with advanced training in Mewati and Gwalior Gharana. She has given numerous stage and TV performances while receiving prestigious awards and accolades. She has achieved a high level of competence in Khayal gayaki and Haveli Sangeet under the able guidance of Pt. Niraj Parikh a senior disciple of Pt. Jasraj. She has been giving performances/ training for the last 17 yrs in the US and currently resides in the RTP area.'
  }
];

export const INITIAL_ORGS: Organization[] = [
  {
    id: uid(),
    name: 'ICMDS | Kailassa Foundation',
    description: 'ICMDS is a renowned organization patronizing Indian fine arts music. ICMDS is based in New Jersey and organizes events throughout the USA and Canada',
    contact: '732-555-1212 | info@icmds.org',
    website: 'www.ICMDS.org'
  },
  {
    id: uid(),
    name: 'Laasya',
    description: 'Laasya is a Triangle based organization patronizing emerging artists within the USA and Canada.',
    contact: '919-332-4545 | contact@laasya.com',
    website: 'www.laasya-fine-arts.com'
  },
  {
    id: uid(),
    name: 'Swaranjali',
    description: 'Swaranjali partners with various national cultural associations to organize classical music events in the Triangle. Swaranjali is volunteer founded and run.',
    contact: '',
    website: 'www.swaranjali.org | 919-232-6767'
  }
];

export const PAGE_PLACEHOLDERS: Record<string, string> = {
  [PageType.TALK]: 'Welcome to SabDesis Talk Page. This page is under construction. Please be sure to visit us later',
  [PageType.YOGA]: 'Welcome to SabDesis Yoga Page. This page is under construction. Please be sure to visit us later',
  [PageType.CLASSIFIEDS]: 'Welcome to SabDesis Classifieds. This page is under construction. Please be sure to visit us later'
};
