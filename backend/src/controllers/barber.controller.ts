// backend/src/controllers/barber.controller.ts
import { RequestHandler } from 'express';
import { BarberService } from '../services/barber.service';

export class BarberController {
  static create: RequestHandler = async (req, res, next) => {
    try {
      const { name, age, hireDate } = req.body;
      const barber = await BarberService.create(name, age, hireDate);
      res.status(201).json(barber);
    } catch (err) {
      next(err);
    }
  };

  static list: RequestHandler = async (req, res, next) => {
    try {
      const barbers = await BarberService.findAll();
      res.json(barbers);
    } catch (err) {
      next(err);
    }
  };

  static get: RequestHandler = async (req, res, next) => {
    try {
      const barber = await BarberService.findById(Number(req.params.id));
      if (!barber) {
        res.status(404).json({ message: 'Barbeiro não encontrado' });
        return;
      }
      res.json(barber);
    } catch (err) {
      next(err);
    }
  };

  static update: RequestHandler = async (req, res, next) => {
    try {
      const updated = await BarberService.update(Number(req.params.id), req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  static remove: RequestHandler = async (req, res, next) => {
    try {
      await BarberService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
