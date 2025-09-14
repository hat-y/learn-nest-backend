import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  private static initialized = false;

  async onModuleInit() {
    if (!PrismaService.initialized) {
      PrismaService.initialized = true;
      await this.$connect();
    }
  }

  async onModuleDestroy() {
    if (PrismaService.initialized) {
      PrismaService.initialized = false;
      await this.$disconnect();
    }
  }
}
