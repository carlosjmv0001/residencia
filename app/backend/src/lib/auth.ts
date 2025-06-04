import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export class AuthService {
  async registerUser(name: string, email: string, password: string): Promise<User> {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('O usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'user', // Default role
      },
    });

    return {
      id: user.id,
      name: user.name!,
      email: user.email!,
      role: user.role,
    };
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      return null;
    }

    return {
      id: user.id,
      name: user.name!,
      email: user.email!, // Non-null assertion
      role: user.role,
    };
  }

  generateToken(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );
  }

  verifyToken(token: string): User | null {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
      return decoded;
    } catch (error) {
      console.log(error instanceof Error ? error.message : String(error))
      return null
    }
  }
}

export const authService = new AuthService();
