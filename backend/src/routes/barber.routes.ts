import { Router } from 'express';
import { BarberController } from '../controllers/barber.controller';

const router = Router();

router.post('/', BarberController.create);
router.get('/', BarberController.list);
router.get('/:id', BarberController.get);
router.put('/:id', BarberController.update);
router.delete('/:id', BarberController.remove);

export default router;