import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthModel } from '../models/auth.model';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export class AuthService {
  static async signup(name: string, email: string, password: string) {
    const existing = await AuthModel.findByEmail(email);
    if (existing) throw new Error('Email já cadastrado');

    const hash = await bcrypt.hash(password, 10);
    return AuthModel.createUser({ name, email, password: hash });
  }

  static async login(email: string, password: string) {
    const user = await AuthModel.findByEmail(email);
    if (!user) throw new Error('Credenciais inválidas');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Credenciais inválidas');

    return jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  }
}