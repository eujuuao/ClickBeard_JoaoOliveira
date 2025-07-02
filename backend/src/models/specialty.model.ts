import { PrismaClient, Specialty } from '@prisma/client';
const prisma = new PrismaClient();

export const SpecialtyModel = {
  create: (data: { name: string }): Promise<Specialty> =>
    prisma.specialty.create({ data }),

  findAll: (): Promise<Specialty[]> =>
    prisma.specialty.findMany(),

  findById: (id: number): Promise<Specialty | null> =>
    prisma.specialty.findUnique({ where: { id } }),

  update: (id: number, data: Partial<Specialty>): Promise<Specialty> =>
    prisma.specialty.update({ where: { id }, data }),

  delete: (id: number): Promise<Specialty> =>
    prisma.specialty.delete({ where: { id } }),
};