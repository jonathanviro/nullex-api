import { Module } from '@nestjs/common';
import { RouteMapsService } from './route-maps.service';
import { RouteMapsController } from './route-maps.controller';
import { RouteMapsRepository } from './repositories/route-maps.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RouteMapsController],
  providers: [RouteMapsService, RouteMapsRepository, PrismaService],
  exports: [RouteMapsService],
})
export class RouteMapsModule {}
