// Auth Types
export interface LoginCredentials {
  phoneNumber: string;
  password: string;
}

export interface SignUpData {
  fullName: string;
  farmName: string;
  phoneNumber: string;
  password: string;
  email: string;
}

export interface User {
  id: string;
  fullName: string;
  farmName: string;
  phoneNumber: string;
  createdAt: string;
}

// Batch Types
export type BirdType = 'broilers' | 'layers';

export interface BatchData {
  name: string;
  birdType: BirdType;
  numberOfBirds: number;
  startDate: string;
}

export interface Batch extends BatchData {
  id: string;
  status: 'active' | 'completed' | 'archived';
  currentAge: number; // in days
  birdsLive: number;
  mortality: number;
  createdAt: string;
  updatedAt: string;
}

// Navigation Types
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  CreateFirstBatch: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  time?: string;
  priority?: 'high' | 'routine';
  status: 'done' | 'pending';
  image?: string;
}
