
import React from 'react';

export const COLORS = {
  bg: '#F8F5F2',
  text: '#4A443F',
  accent: '#A68D85',
  muted: '#8E837D',
  calm: '#C8D3C5',
  warm: '#EBD8D0',
};

export const ICONS = {
  Home: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Wind: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2" />
      <path d="M12.59 19.41A2 2 0 1 0 14 16H2" />
      <path d="M15.59 12.41A2 2 0 1 1 17 9H2" />
    </svg>
  ),
  Trash: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Heart: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Menu: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  ),
  Flower: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 16.5A4.5 4.5 0 1 0 7.5 12" />
      <path d="M12 7.5A4.5 4.5 0 1 1 16.5 12" />
      <path d="M7.5 12A4.5 4.5 0 1 0 12 7.5" />
      <path d="M16.5 12A4.5 4.5 0 1 1 12 16.5" />
    </svg>
  ),
  Zap: (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};
