import express from 'express';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => { res.send('Bem-vindo à API ClickBeard!');});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});