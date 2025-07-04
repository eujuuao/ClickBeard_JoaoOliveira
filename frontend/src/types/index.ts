export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'admin';
  createdAt: string;
}

export interface Barber {
  id: string;
  name: string;
  age: number;
  hireDate: string;
  specialties: string[];
  avatar?: string;
}

export interface Specialty {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  description?: string;
}

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  barberId: string;
  barberName: string;
  specialtyId: string;
  specialtyName: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  bookingId?: string;
}