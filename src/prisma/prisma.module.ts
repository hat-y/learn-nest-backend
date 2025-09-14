// Modulos Externos
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Modulos Internos
import {
  existsExtension,
  restoreExtension,
  softDeleteExtension,
} from './prisma.extensions';

export const EXTENDED_PRISMA = Symbol('EXTENDED_PRISMA');

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: EXTENDED_PRISMA,
      useFactory: (prisma: PrismaService) =>
        prisma
          .$extends(existsExtension)
          .$extends(softDeleteExtension)
          .$extends(restoreExtension),
      inject: [PrismaService],
    },
  ],
})
export class PrismaModule {}
