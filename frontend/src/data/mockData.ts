import { Barber, Specialty, Booking } from '@/types';

export const mockBarbers: Barber[] = [
  {
    id: '1',
    name: 'Marcus Johnson',
    age: 32,
    hireDate: '2020-03-15',
    specialties: ['1', '2', '3'],
  },
  {
    id: '2',
    name: 'David Rodriguez',
    age: 28,
    hireDate: '2021-08-22',
    specialties: ['1', '4', '5'],
  },
  {
    id: '3',
    name: 'Michael Chen',
    age: 35,
    hireDate: '2019-11-10',
    specialties: ['2', '3', '6'],
  },
  {
    id: '4',
    name: 'James Wilson',
    age: 29,
    hireDate: '2022-01-18',
    specialties: ['1', '5', '6'],
  },
];

export const mockSpecialties: Specialty[] = [
  {
    id: '1',
    name: 'Classic Cut',
    duration: 30,
    price: 25,
    description: 'Traditional haircut with scissors and clippers',
  },
  {
    id: '2',
    name: 'Beard Trim',
    duration: 30,
    price: 20,
    description: 'Professional beard trimming and shaping',
  },
  {
    id: '3',
    name: 'Full Service',
    duration: 60,
    price: 40,
    description: 'Haircut + beard trim + styling',
  },
  {
    id: '4',
    name: 'Hot Towel Shave',
    duration: 45,
    price: 35,
    description: 'Traditional straight razor shave with hot towels',
  },
  {
    id: '5',
    name: 'Styling & Wash',
    duration: 30,
    price: 30,
    description: 'Hair wash, cut, and professional styling',
  },
  {
    id: '6',
    name: 'Luxury Package',
    duration: 90,
    price: 65,
    description: 'Full service + hot towel shave + face treatment',
  },
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    clientId: 'client1',
    clientName: 'John Smith',
    barberId: '1',
    barberName: 'Marcus Johnson',
    specialtyId: '3',
    specialtyName: 'Full Service',
    date: '2024-07-02',
    time: '10:00',
    duration: 60,
    price: 40,
    status: 'confirmed',
    createdAt: '2024-07-01T10:00:00Z',
  },
  {
    id: '2',
    clientId: 'client2',
    clientName: 'Mike Davis',
    barberId: '2',
    barberName: 'David Rodriguez',
    specialtyId: '1',
    specialtyName: 'Classic Cut',
    date: '2024-07-02',
    time: '14:30',
    duration: 30,
    price: 25,
    status: 'confirmed',
    createdAt: '2024-07-01T15:30:00Z',
  },
  {
    id: '3',
    clientId: 'client1',
    clientName: 'John Smith',
    barberId: '3',
    barberName: 'Michael Chen',
    specialtyId: '2',
    specialtyName: 'Beard Trim',
    date: '2024-07-03',
    time: '11:00',
    duration: 30,
    price: 20,
    status: 'confirmed',
    createdAt: '2024-07-01T11:00:00Z',
  },
];

export const generateTimeSlots = (date: string, barberId: string): string[] => {
  const slots = [];
  for (let hour = 8; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(time);
    }
  }
  return slots;
};