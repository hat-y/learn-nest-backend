// Modulos Externos
import { Module } from '@nestjs/common';

// Modulos Internos
import { PrismaService } from './prisma.service';
import { PrismaProvider } from './prisma.provider';

@Module({
  providers: [PrismaProvider, PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
