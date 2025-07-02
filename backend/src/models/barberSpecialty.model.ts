import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const BarberSpecialtyModel = {
  add: (barberId: number, specialtyId: number) =>
    prisma.barberSpecialty.create({
      data: { barberId, specialtyId },
    }),

  remove: (barberId: number, specialtyId: number) =>
    prisma.barberSpecialty.delete({
      where: { barberId_specialtyId: { barberId, specialtyId } },
    }),

  findByBarber: (barberId: number) =>
    prisma.barber.findUnique({
      where: { id: barberId },
      include: { specialties: { include: { specialty: true } } },
    }),
};