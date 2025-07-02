import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';

const router = Router();

router.post('/', AppointmentController.create);
router.get('/', AppointmentController.list);
router.delete('/:id', AppointmentController.remove);

export default router;