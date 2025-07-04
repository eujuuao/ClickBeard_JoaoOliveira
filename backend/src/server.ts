import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import barberRoutes from './routes/barber.routes';
import specialtyRoutes from './routes/specialty.routes';
import barberSpecialtyRoutes from './routes/barberSpecialty.routes';
import appointmentRoutes from './routes/appointment.routes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/barbers', barberRoutes);
app.use('/specialties', specialtyRoutes);
app.use('/barbers/:barberId/specialties', barberSpecialtyRoutes);
app.use('/appointments', appointmentRoutes);

app.get('/', (_, res) => { res.send('Bem-vindo à API ClickBeard!');});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});