import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface Application {
  id: string;
  discord: string;
  fullName: string;
  age: string;
  country: string;
  game: string;
  rank: string;
  experience: string;
  teamExperience: string;
  availability: string;
  socialMedia: string;
  gameProfile: string;
  clips: string;
  additionalInfo: string;
  date: string;
  status: 'PENDING' | 'ACCEPTED' | 'REFUSED';
}

export interface Tournament {
  id: string;
  name: string;
  game: string;
  description: string;
  date: string;
  time: string;
  prizePool: string;
  maxTeams: number;
  registeredTeams: number;
  registrationDeadline: string;
  status: 'UPCOMING' | 'LIVE' | 'FINISHED';
  winner?: string;
  finalResult?: string;
  currentStage?: string;
}

export interface Registration {
  id: string;
  teamName: string;
  captainDiscord: string;
  members: string;
  game: string;
  tournamentId: string;
  tournamentName: string;
  teamLogo: string;
  contact: string;
  date: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  category: string;
  date: string;
  author: string;
  published: boolean;
}

export interface GameInfo {
  id: string;
  name: string;
  description: string;
  image: string;
  status: string;
  players: { name: string; role: string, rank: string }[];
  upcomingMatches: { opponent: string; date: string; time: string }[];
  results: { opponent: string; score: string; date: string; result: string }[];
}

export interface SiteContent {
  homeTitle: string;
  heroHeadline: string;
  heroDescription: string;
  aboutText: string;
  discordUrl: string;
  footerText: string;
}

interface State {
  applications: Application[];
  tournaments: Tournament[];
  registrations: Registration[];
  news: NewsArticle[];
  games: GameInfo[];
  siteContent: SiteContent;
  isAdminAuthenticated: boolean;
}

type Action =
  | { type: 'ADD_APPLICATION'; payload: Application }
  | { type: 'UPDATE_APPLICATION_STATUS'; payload: { id: string; status: 'ACCEPTED' | 'REFUSED' } }
  | { type: 'ADD_TOURNAMENT'; payload: Tournament }
  | { type: 'UPDATE_TOURNAMENT'; payload: Tournament }
  | { type: 'DELETE_TOURNAMENT'; payload: string }
  | { type: 'ADD_REGISTRATION'; payload: Registration }
  | { type: 'UPDATE_REGISTRATION_STATUS'; payload: { id: string; status: 'ACCEPTED' | 'REJECTED' } }
  | { type: 'DELETE_REGISTRATION'; payload: string }
  | { type: 'ADD_NEWS'; payload: NewsArticle }
  | { type: 'UPDATE_NEWS'; payload: NewsArticle }
  | { type: 'DELETE_NEWS'; payload: string }
  | { type: 'UPDATE_SITE_CONTENT'; payload: Partial<SiteContent> }
  | { type: 'LOGIN_ADMIN' }
  | { type: 'LOGOUT_ADMIN' }
  | { type: 'UPDATE_GAME'; payload: GameInfo };

const initialState: State = {
  isAdminAuthenticated: false,
  applications: [
    {
      id: '1',
      discord: 'shadowstrike#1234',
      fullName: 'Alex "ShadowStrike" Chen',
      age: '22',
      country: 'United States',
      game: 'VALORANT',
      rank: 'Immortal 3',
      experience: '5 years competitive FPS',
      teamExperience: 'Played for Cloud9 Academy, TSM Challengers',
      availability: 'Full-time',
      socialMedia: '@shadowstrike_vlr',
      gameProfile: 'tracker.gg/valorant/shadowstrike',
      clips: 'youtube.com/shadowstrike-highlights',
      additionalInfo: 'IGL with strong comms',
      date: '2025-01-15',
      status: 'PENDING'
    },
    {
      id: '2',
      discord: 'blitzking#5678',
      fullName: 'Marcus "BlitzKing" Johnson',
      age: '19',
      country: 'United Kingdom',
      game: 'Fortnite',
      rank: 'Unreal',
      experience: '3 years competitive BR',
      teamExperience: 'FNCS Semi-Finalist Season 4',
      availability: 'Part-time',
      socialMedia: '@blitzking_fn',
      gameProfile: 'fortnitetracker.com/blitzking',
      clips: 'youtube.com/blitzking-clips',
      additionalInfo: 'Aggressive entry fragger',
      date: '2025-01-18',
      status: 'ACCEPTED'
    }
  ],
  tournaments: [
    {
      id: '1',
      name: 'VEXORA Valorant Championship',
      game: 'VALORANT',
      description: 'The premier VALORANT tournament organized by VEXORA Esports. Top teams compete for glory and prizes.',
      date: '2025-02-01',
      time: '18:00 UTC',
      prizePool: '$10,000',
      maxTeams: 32,
      registeredTeams: 28,
      registrationDeadline: '2025-01-28',
      status: 'LIVE',
      currentStage: 'Quarter Finals'
    },
    {
      id: '2',
      name: 'VEXORA Fortnite Showdown',
      game: 'Fortnite',
      description: 'High-stakes Fortnite competition featuring the best BR players.',
      date: '2025-02-15',
      time: '20:00 UTC',
      prizePool: '$5,000',
      maxTeams: 50,
      registeredTeams: 35,
      registrationDeadline: '2025-02-10',
      status: 'UPCOMING'
    },
    {
      id: '3',
      name: 'VEXORA FC Cup',
      game: 'EA SPORTS FC',
      description: 'Ultimate EA SPORTS FC competition for professional players.',
      date: '2025-01-10',
      time: '19:00 UTC',
      prizePool: '$3,000',
      maxTeams: 16,
      registeredTeams: 16,
      registrationDeadline: '2025-01-05',
      status: 'FINISHED',
      winner: 'ProGamer_FC',
      finalResult: '3-1'
    },
    {
      id: '4',
      name: 'VEXORA Call of Duty League',
      game: 'Call of Duty',
      description: 'Fast-paced CoD competition with top-tier teams.',
      date: '2025-02-20',
      time: '21:00 UTC',
      prizePool: '$7,500',
      maxTeams: 24,
      registeredTeams: 12,
      registrationDeadline: '2025-02-15',
      status: 'UPCOMING'
    }
  ],
  registrations: [
    {
      id: '1',
      teamName: 'Phantom Squad',
      captainDiscord: 'phantom_cap#0001',
      members: 'Phantom, Blaze, Viper, Ghost, Shadow',
      game: 'VALORANT',
      tournamentId: '1',
      tournamentName: 'VEXORA Valorant Championship',
      teamLogo: '',
      contact: 'phantom@esports.gg',
      date: '2025-01-20',
      status: 'ACCEPTED'
    },
    {
      id: '2',
      teamName: 'Neon Wolves',
      captainDiscord: 'neonwolf#9999',
      members: 'NeonWolf, Cyber, Pixel, Byte, Glitch',
      game: 'VALORANT',
      tournamentId: '1',
      tournamentName: 'VEXORA Valorant Championship',
      teamLogo: '',
      contact: 'neonwolf@team.gg',
      date: '2025-01-21',
      status: 'PENDING'
    }
  ],
  news: [
    {
      id: '1',
      title: 'VEXORA Valorant Championship Goes Live',
      description: 'The biggest VALORANT tournament of the season is now live. Watch the best teams compete for $10,000 in prizes.',
      coverImage: '',
      category: 'Tournament',
      date: '2025-02-01',
      author: 'VEXORA Media',
      published: true
    },
    {
      id: '2',
      title: 'New Roster Announced for Fortnite Division',
      description: 'VEXORA is proud to announce our new Fortnite competitive roster featuring some of the best BR players in the world.',
      coverImage: '',
      category: 'Roster',
      date: '2025-01-25',
      author: 'VEXORA Media',
      published: true
    },
    {
      id: '3',
      title: 'VEXORA x Discord Partnership',
      description: 'We are excited to announce our partnership with Discord to bring exclusive content and events to our community.',
      coverImage: '',
      category: 'Partnership',
      date: '2025-01-20',
      author: 'VEXORA Media',
      published: true
    }
  ],
  games: [
    {
      id: '1',
      name: 'VALORANT',
      description: 'Competitive 5v5 tactical shooter. VEXORA fields elite teams competing in regional and international tournaments.',
      image: '',
      status: 'Active Roster',
      players: [
        { name: 'ShadowStrike', role: 'IGL / Duelist', rank: 'Immortal 3' },
        { name: 'PhantomAim', role: 'Sentinel', rank: 'Immortal 2' },
        { name: 'VortexFlash', role: 'Controller', rank: 'Immortal 1' },
        { name: 'BlazeRunner', role: 'Initiator', rank: 'Diamond 3' },
        { name: 'IceCold', role: 'Flex', rank: 'Immortal 1' }
      ],
      upcomingMatches: [
        { opponent: 'Team Phoenix', date: '2025-02-10', time: '20:00 UTC' },
        { opponent: 'NightHawks', date: '2025-02-15', time: '19:00 UTC' }
      ],
      results: [
        { opponent: 'StormRaiders', score: '13-7', date: '2025-01-28', result: 'WIN' },
        { opponent: 'DarkMatter', score: '13-11', date: '2025-01-25', result: 'WIN' }
      ]
    },
    {
      id: '2',
      name: 'Fortnite',
      description: 'Battle Royale dominance. Our Fortnite squad competes in FNCS and major third-party events.',
      image: '',
      status: 'Active Roster',
      players: [
        { name: 'BlitzKing', role: 'Entry', rank: 'Unreal' },
        { name: 'SkyDiver', role: 'Support', rank: 'Unreal' },
        { name: 'TurboBuild', role: 'Flex', rank: 'Unreal' }
      ],
      upcomingMatches: [
        { opponent: 'FNCS Qualifier', date: '2025-02-12', time: '18:00 UTC' }
      ],
      results: [
        { opponent: 'Cash Cup', score: 'Top 10', date: '2025-01-30', result: 'WIN' }
      ]
    },
    {
      id: '3',
      name: 'EA SPORTS FC',
      description: 'Virtual football excellence. VEXORA represents in eWorld Cup qualifiers and online leagues.',
      image: '',
      status: 'Recruiting',
      players: [
        { name: 'ProGamer_FC', role: 'Striker Main', rank: 'Top 100' },
        { name: 'GoalMaster', role: 'Flex', rank: 'Top 200' }
      ],
      upcomingMatches: [
        { opponent: 'eLeague Qualifier', date: '2025-02-20', time: '20:00 UTC' }
      ],
      results: [
        { opponent: 'VEXORA FC Cup', score: 'Champion', date: '2025-01-10', result: 'WIN' }
      ]
    },
    {
      id: '4',
      name: 'Call of Duty',
      description: 'Fast-paced FPS action. Competing in CDL qualifiers and major online tournaments.',
      image: '',
      status: 'Building Roster',
      players: [
        { name: 'QuickScope', role: 'SL', rank: 'Top 250' },
        { name: 'FragMaster', role: 'AR', rank: 'Top 500' }
      ],
      upcomingMatches: [
        { opponent: 'Online Qualifier', date: '2025-02-25', time: '21:00 UTC' }
      ],
      results: [
        { opponent: 'Weekly Challenge', score: '4-2', date: '2025-01-29', result: 'WIN' }
      ]
    },
    {
      id: '5',
      name: 'FiveM',
      description: 'Roleplay and competitive GTA V. Building the most immersive FiveM community and competitive scene.',
      image: '',
      status: 'Active',
      players: [
        { name: 'StreetKing', role: 'Crew Lead', rank: 'Top Server' },
        { name: 'DriftMaster', role: 'Racer', rank: 'Top 10' }
      ],
      upcomingMatches: [
        { opponent: 'Server Wars', date: '2025-03-01', time: '22:00 UTC' }
      ],
      results: [
        { opponent: 'Rival Crew', score: 'Victory', date: '2025-01-27', result: 'WIN' }
      ]
    }
  ],
  siteContent: {
    homeTitle: 'VEXORA ESPORTS',
    heroHeadline: 'BUILT TO COMPETE.\nMADE TO DOMINATE.',
    heroDescription: 'VEXORA Esports is a competitive gaming organization dedicated to excellence in esports. We build winning teams, host premier tournaments, and create a community of champions.',
    aboutText: 'VEXORA Esports was founded with a single vision: to create a competitive gaming organization that sets the standard for excellence. We believe in discipline, teamwork, and the relentless pursuit of victory.',
    discordUrl: 'https://discord.gg/vexora',
    footerText: '© 2025 VEXORA ESPORTS. All rights reserved.'
  }
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_APPLICATION':
      return { ...state, applications: [...state.applications, action.payload] };
    case 'UPDATE_APPLICATION_STATUS':
      return {
        ...state,
        applications: state.applications.map(app =>
          app.id === action.payload.id ? { ...app, status: action.payload.status } : app
        )
      };
    case 'ADD_TOURNAMENT':
      return { ...state, tournaments: [...state.tournaments, action.payload] };
    case 'UPDATE_TOURNAMENT':
      return {
        ...state,
        tournaments: state.tournaments.map(t =>
          t.id === action.payload.id ? action.payload : t
        )
      };
    case 'DELETE_TOURNAMENT':
      return { ...state, tournaments: state.tournaments.filter(t => t.id !== action.payload) };
    case 'ADD_REGISTRATION':
      return { ...state, registrations: [...state.registrations, action.payload] };
    case 'UPDATE_REGISTRATION_STATUS':
      return {
        ...state,
        registrations: state.registrations.map(r =>
          r.id === action.payload.id ? { ...r, status: action.payload.status } : r
        )
      };
    case 'DELETE_REGISTRATION':
      return { ...state, registrations: state.registrations.filter(r => r.id !== action.payload) };
    case 'ADD_NEWS':
      return { ...state, news: [...state.news, action.payload] };
    case 'UPDATE_NEWS':
      return {
        ...state,
        news: state.news.map(n => n.id === action.payload.id ? action.payload : n)
      };
    case 'DELETE_NEWS':
      return { ...state, news: state.news.filter(n => n.id !== action.payload) };
    case 'UPDATE_SITE_CONTENT':
      return { ...state, siteContent: { ...state.siteContent, ...action.payload } };
    case 'LOGIN_ADMIN':
      return { ...state, isAdminAuthenticated: true };
    case 'LOGOUT_ADMIN':
      return { ...state, isAdminAuthenticated: false };
    case 'UPDATE_GAME':
      return {
        ...state,
        games: state.games.map(g => g.id === action.payload.id ? action.payload : g)
      };
    default:
      return state;
  }
}

const StoreContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}
