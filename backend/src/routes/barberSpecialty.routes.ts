import { Router } from 'express';
import { BarberSpecialtyController } from '../controllers/barberSpecialty.controller';

const router = Router({ mergeParams: true });

// Adicionar especialidade a um barbeiro
router.post('/', BarberSpecialtyController.add);

// Listar especialidades de um barbeiro
router.get('/', BarberSpecialtyController.list);

// Remover especialidade de um barbeiro
router.delete('/:specialtyId', BarberSpecialtyController.remove);

export default router;