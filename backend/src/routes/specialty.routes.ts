import { Router } from 'express';
import { SpecialtyController } from '../controllers/specialty.controller';

const router = Router();

router.post('/', SpecialtyController.create);
router.get('/', SpecialtyController.list);
router.get('/:id', SpecialtyController.get);
router.put('/:id', SpecialtyController.update);
router.delete('/:id', SpecialtyController.remove);

export default router;