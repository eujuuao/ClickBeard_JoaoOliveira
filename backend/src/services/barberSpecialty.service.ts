import { BarberSpecialtyModel } from '../models/barberSpecialty.model';

export class BarberSpecialtyService {
  static async add(barberId: number, specialtyId: number) {
    return BarberSpecialtyModel.add(barberId, specialtyId);
  }

  static async remove(barberId: number, specialtyId: number) {
    return BarberSpecialtyModel.remove(barberId, specialtyId);
  }

  static async listByBarber(barberId: number) {
    const barber = await BarberSpecialtyModel.findByBarber(barberId);
    return barber?.specialties.map((bs) => bs.specialty) || [];
  }
}