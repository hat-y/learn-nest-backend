// Modulos Externos
import { Injectable } from '@nestjs/common';

// Modulos Internos
import { UserRepository } from 'src/domain/users/repositories/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(
    id: number,
  ): Promise<{ id: number; email: string; deletedAt: Date | null } | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, deletedAt: true },
    });
  }

  findByEmail(email: string): Promise<{ id: number; email: string } | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
    });
  }

  listActive(): Promise<Array<{ id: number; email: string }>> {
    return this.prisma.user.findMany({
      select: { id: true, email: true },
    });
  }

  createUser(data: {
    email: string;
    firstName: string;
    lastName: string;
    roleId: string;
  }): Promise<{ id: number; email: string }> {
    return this.prisma.user.create({
      data,
      select: { id: true, email: true },
    });
  }

  async softDeleteById(id: number): Promise<void> {
    await this.prisma.user.softDelete({ id });
  }

  async restoreById(id: number): Promise<void> {
    await this.prisma.user.restore({ id });
  }
}
