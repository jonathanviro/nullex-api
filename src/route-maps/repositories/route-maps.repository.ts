import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRouteMapDto, UpdateRouteMapDto } from '../dto';
import { RouteMapEntity } from '../entities/route-map.entity';
import { handleDatabaseErrors } from 'src/common/helpers/database-error.helper';

@Injectable()
export class RouteMapsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRouteMapDto): Promise<RouteMapEntity> {
    try {
      const created = await this.prisma.routeMap.create({ data });
      return new RouteMapEntity(created);
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }

  async findFirst(): Promise<RouteMapEntity | null> {
    const result = await this.prisma.routeMap.findFirst();
    return result ? new RouteMapEntity(result) : null;
  }

  async findAll(): Promise<RouteMapEntity[]> {
    const items = await this.prisma.routeMap.findMany();
    return items.map((item) => new RouteMapEntity(item));
  }

  async findById(id: string): Promise<RouteMapEntity | null> {
    const result = await this.prisma.routeMap.findUnique({ where: { id } });
    return result ? new RouteMapEntity(result) : null;
  }

  async update(id: string, data: UpdateRouteMapDto): Promise<RouteMapEntity> {
    try {
      const updated = await this.prisma.routeMap.update({
        where: { id },
        data,
      });
      return new RouteMapEntity(updated);
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }
}
