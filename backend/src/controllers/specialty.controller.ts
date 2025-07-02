import { RequestHandler } from 'express';
import { SpecialtyService } from '../services/specialty.service';

export class SpecialtyController {
  static create: RequestHandler = async (req, res, next) => {
    try {
      const { name } = req.body;
      const spec = await SpecialtyService.create(name);
      res.status(201).json(spec);
    } catch (err) {
      next(err);
    }
  };

  static list: RequestHandler = async (req, res, next) => {
    try {
      const specs = await SpecialtyService.findAll();
      res.json(specs);
    } catch (err) {
      next(err);
    }
  };

  static get: RequestHandler = async (req, res, next) => {
    try {
      const spec = await SpecialtyService.findById(Number(req.params.id));
      if (!spec) {
        res.status(404).json({ message: 'Especialidade não encontrada' });
        return;
      }
      res.json(spec);
    } catch (err) {
      next(err);
    }
  };

  static update: RequestHandler = async (req, res, next) => {
    try {
      const updated = await SpecialtyService.update(Number(req.params.id), req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  static remove: RequestHandler = async (req, res, next) => {
    try {
      await SpecialtyService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}