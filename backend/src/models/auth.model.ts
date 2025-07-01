// backend/src/models/auth.model.ts

import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const AuthModel = {
  /**
   * Cria um novo usuário no banco.
   * @param data Objeto com name, email e password (hash já gerado).
   * @returns Promise<User>
   */
  createUser: (data: { name: string; email: string; password: string; }): Promise<User> => {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  },

  /**
   * Busca um usuário pelo email.
   * @param email string
   * @returns Promise<User | null>
   */
  findByEmail: (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  /**
   * Busca um usuário pelo ID.
   * @param id number
   * @returns Promise<User | null>
   */
  findById: (id: number): Promise<User | null> => {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  /**
   * Atualiza dados de um usuário.
   * @param id number
   * @param data Partial<User> — campos a serem atualizados
   * @returns Promise<User>
   */
  updateUser: (id: number, data: Partial<Omit<User, 'id'>>): Promise<User> => {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  /**
   * Remove um usuário do banco.
   * @param id number
   * @returns Promise<User>
   */
  deleteUser: (id: number): Promise<User> => {
    return prisma.user.delete({
      where: { id },
    });
  },
};
