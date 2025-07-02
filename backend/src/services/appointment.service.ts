import { AppointmentModel } from '../models/appointment.model';

export class AppointmentService {
  static async create(
    clientId: number,
    barberId: number,
    specialtyId: number,
    slotStr: string
  ) {
    const slot = new Date(slotStr);
    const hour = slot.getHours();
    // Regras de horário: 08:00–18:00
    if (hour < 8 || hour >= 18) {
      throw new Error('Horário fora do expediente (08:00–18:00).');
    }

    // Conflito de slot
    const conflicts = await AppointmentModel.findConflicts(barberId, slot);
    if (conflicts.length) {
      throw new Error('Barbeiro já agendado neste horário.');
    }

    return AppointmentModel.create({ clientId, barberId, specialtyId, slot });
  }

  static async list() {
    return AppointmentModel.findAll();
  }

  static async remove(id: number) {
    // Verifica se pode cancelar: até 2h antes
    const appt = await AppointmentModel.findById(id);
    if (!appt) throw new Error('Agendamento não encontrado.');

    const now = new Date();
    const diffMs = appt.slot.getTime() - now.getTime();
    if (diffMs < 2 * 60 * 60 * 1000) {
      throw new Error('Cancelamento só até 2 h antes do horário.');
    }

    return AppointmentModel.delete(id);
  }
}