import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await AuthService.signup(name, email, password);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup falhou';
      res.status(400).json({ message });
    }
  }

 static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.json({ token });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha na autenticação';
      res.status(401).json({ message });
    }
  }
}