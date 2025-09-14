import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersService } from './src/users/users.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [PrismaService, UsersService],
})
export class AppModule {}
