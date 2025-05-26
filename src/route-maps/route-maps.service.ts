import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRouteMapDto, UpdateRouteMapDto } from './dto';
import { RouteMapsRepository } from './repositories/route-maps.repository';
import { RouteMapEntity } from './entities/route-map.entity';
import { handleDatabaseErrors } from 'src/common/helpers/database-error.helper';

@Injectable()
export class RouteMapsService {
  constructor(private readonly routeMapsRepository: RouteMapsRepository) {}

  async create(createDto: CreateRouteMapDto): Promise<RouteMapEntity> {
    try {
      return await this.routeMapsRepository.create(createDto);
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }

  async find(): Promise<RouteMapEntity> {
    try {
      const routeMap = await this.routeMapsRepository.findFirst();
      if (!routeMap) {
        throw new NotFoundException(
          'No se encontró ninguna configuración de rutas',
        );
      }
      return routeMap;
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }

  async findAll(): Promise<RouteMapEntity[]> {
    try {
      return await this.routeMapsRepository.findAll();
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }

  async findById(id: string): Promise<RouteMapEntity> {
    try {
      const routeMap = await this.routeMapsRepository.findById(id);
      if (!routeMap) {
        throw new NotFoundException(`No se encontró el registro con ID: ${id}`);
      }
      return routeMap;
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }

  async update(
    id: string,
    updateDto: UpdateRouteMapDto,
  ): Promise<RouteMapEntity> {
    try {
      await this.findById(id);
      return await this.routeMapsRepository.update(id, updateDto);
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }

  async uploadImages(
    id: string,
    files: {
      imgRoute1?: Express.Multer.File[];
      imgRoute2?: Express.Multer.File[];
      imgRoute3?: Express.Multer.File[];
      imgRoute4?: Express.Multer.File[];
    },
  ): Promise<RouteMapEntity> {
    try {
      const routeMap = await this.routeMapsRepository.findById(id);
      if (!routeMap) {
        throw new NotFoundException(`No se encontró el registro con ID: ${id}`);
      }

      const uploadPath = 'uploads/documents/imgs';
      const updates: Record<string, string> = {};

      const imageMap = {
        imgRoute1: 'route-1',
        imgRoute2: 'route-2',
        imgRoute3: 'route-3',
        imgRoute4: 'route-4',
      };

      const allowedExts = ['jpg', 'jpeg', 'png'];

      for (const key in imageMap) {
        const file = files[key]?.[0];
        if (file) {
          const ext = file.originalname.split('.').pop()?.toLowerCase();
          if (!ext || !allowedExts.includes(ext)) {
            throw new Error(
              `Formato inválido para ${key}. Solo se permiten JPG y PNG.`,
            );
          }

          const fileName = `${id}.${ext}`;
          const filePath = `${uploadPath}/${imageMap[key]}/${fileName}`;

          const fs = require('fs');
          const path = require('path');
          const fullPath = path.resolve(filePath);
          fs.mkdirSync(path.dirname(fullPath), { recursive: true });
          fs.writeFileSync(fullPath, file.buffer);

          updates[key] = filePath;
        }
      }

      return await this.routeMapsRepository.update(id, updates);
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }
}
