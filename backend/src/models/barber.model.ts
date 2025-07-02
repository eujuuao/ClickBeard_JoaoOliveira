import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const BarberModel = {
  create: (data: { name: string; age: number; hiredDate: Date }) =>
    prisma.barber.create({ data }),

  findAll: () =>
    prisma.barber.findMany({ include: { specialties: true } }),

  findById: (id: number) =>
    prisma.barber.findUnique({ where: { id }, include: { specialties: true } }),

  update: (id: number, data: any) =>
    prisma.barber.update({ where: { id }, data }),

  delete: (id: number) =>
    prisma.barber.delete({ where: { id } }),
};