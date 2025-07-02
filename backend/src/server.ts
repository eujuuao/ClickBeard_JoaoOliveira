import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import barberRoutes from './routes/barber.routes';


dotenv.config();
const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/barbers', barberRoutes);

app.get('/', (req, res) => { res.send('Bem-vindo à API ClickBeard!');});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});