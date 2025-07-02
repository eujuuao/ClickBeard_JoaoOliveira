import { SpecialtyModel } from '../models/specialty.model';

export class SpecialtyService {
  static async create(name: string) {
    return SpecialtyModel.create({ name });
  }

  static async findAll() {
    return SpecialtyModel.findAll();
  }

  static async findById(id: number) {
    return SpecialtyModel.findById(id);
  }

  static async update(id: number, data: any) {
    return SpecialtyModel.update(id, data);
  }

  static async delete(id: number) {
    return SpecialtyModel.delete(id);
  }
}