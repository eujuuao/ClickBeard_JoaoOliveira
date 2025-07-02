import { BarberModel } from '../models/barber.model';

export class BarberService {
  static async create(name: string, age: number, hireDate: string) {
    return BarberModel.create({
      name,
      age,
      hiredDate: new Date(hireDate),
    });
  }

  static async findAll() {
    return BarberModel.findAll();
  }

  static async findById(id: number) {
    return BarberModel.findById(id);
  }

  static async update(id: number, data: any) {
    return BarberModel.update(id, data);
  }

  static async delete(id: number) {
    return BarberModel.delete(id);
  }
}