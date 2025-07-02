import { RequestHandler } from 'express';
import { AppointmentService } from '../services/appointment.service';

export class AppointmentController {
  static create: RequestHandler = async (req, res, next) => {
    try {
      const { clientId, barberId, specialtyId, slot } = req.body;
      const appt = await AppointmentService.create(
        Number(clientId),
        Number(barberId),
        Number(specialtyId),
        slot
      );
      res.status(201).json(appt);
    } catch (err) {
      next(err);
    }
  };

  static list: RequestHandler = async (_, res, next) => {
    try {
      const list = await AppointmentService.list();
      res.json(list);
    } catch (err) {
      next(err);
    }
  };

  static remove: RequestHandler = async (req, res, next) => {
    try {
      const removed = await AppointmentService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}