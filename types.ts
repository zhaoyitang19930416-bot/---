
export enum AppTab {
  HOME = 'home',
  MEDITATE = 'meditate',
  SHREDDER = 'shredder',
  TREEHOLE = 'treehole',
  TOOLS = 'tools',
  STORE = 'store',
  AUTH = 'auth'
}

export interface User {
  username: string;
  points: number;
  isLoggedIn: boolean;
  lastCheckIn?: string;
  avatar?: string; // 可以是 Emoji 或 Base64 URL
  nickname?: string;
  address?: string;
  jobTitle?: string;
  mentalState?: string;
  birthday?: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    xiaohongshu?: string;
    wechat?: string;
  };
}

export interface PointItem {
  id: string;
  name: string;
  cost: number;
  icon: string;
  category: string;
}

export interface TreeComment {
  id: string;
  content: string;
  timestamp: number;
  authorName: string;
}

export interface Achievement {
  id: string;
  content: string;
  timestamp: number;
  flowers: number;
  hugs: number;
  tips: number;
  comments: TreeComment[];
  authorName: string;
  images?: string[]; 
  video?: string;   
}

export interface Affirmation {
  text: string;
  author: string;
}
