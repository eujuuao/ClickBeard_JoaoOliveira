import { RequestHandler } from 'express';
import { BarberSpecialtyService } from '../services/barberSpecialty.service';

export class BarberSpecialtyController {
  static add: RequestHandler = async (req, res, next) => {
    try {
      const barberId = Number(req.params.barberId);
      const { specialtyId } = req.body;
      const result = await BarberSpecialtyService.add(barberId, specialtyId);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };

  static remove: RequestHandler = async (req, res, next) => {
    try {
      const barberId = Number(req.params.barberId);
      const specialtyId = Number(req.params.specialtyId);
      await BarberSpecialtyService.remove(barberId, specialtyId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  static list: RequestHandler = async (req, res, next) => {
    try {
      const barberId = Number(req.params.barberId);
      const specialties = await BarberSpecialtyService.listByBarber(barberId);
      res.json(specialties);
    } catch (err) {
      next(err);
    }
  };
}