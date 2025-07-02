import { PrismaClient, Appointment } from '@prisma/client';
const prisma = new PrismaClient();

export const AppointmentModel = {
  create: (data: {
    clientId: number;
    barberId: number;
    specialtyId: number;
    slot: Date;
  }): Promise<Appointment> =>
    prisma.appointment.create({ data }),

  findAll: (): Promise<Appointment[]> =>
    prisma.appointment.findMany(),

  findById: (id: number): Promise<Appointment | null> =>
    prisma.appointment.findUnique({ where: { id } }),

  delete: (id: number): Promise<Appointment> =>
    prisma.appointment.delete({ where: { id } }),

  findConflicts: (barberId: number, slot: Date): Promise<Appointment[]> =>
    prisma.appointment.findMany({
      where: { barberId, slot },
    }),
};