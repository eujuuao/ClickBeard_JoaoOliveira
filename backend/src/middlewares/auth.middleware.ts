import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'alganews';

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token não fornecido' });

  const [, token] = authHeader.split(' ');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload as any; // adicione interface em Request se quiser tipar melhor
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
}