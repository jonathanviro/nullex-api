import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRouteMapDto, UpdateRouteMapDto } from './dto';
import { RouteMapsRepository } from './repositories/route-maps.repository';
import { RouteMapEntity } from './entities/route-map.entity';
import { handleDatabaseErrors } from 'src/common/helpers/database-error.helper';

@Injectable()
export class RouteMapsService {
  constructor(private readonly routeMapsRepository: RouteMapsRepository) {}

  async create(
    body: { description: string },
    files: {
      imgRoute1?: Express.Multer.File[];
      imgRoute2?: Express.Multer.File[];
      imgRoute3?: Express.Multer.File[];
      imgRoute4?: Express.Multer.File[];
    },
  ): Promise<RouteMapEntity> {
    try {
      // 1. Crear la ruta sin imágenes
      const created = await this.routeMapsRepository.create({
        description: body.description,
      });

      const updateData: any = {};
      const imageMap = {
        imgRoute1: 'route-1',
        imgRoute2: 'route-2',
        imgRoute3: 'route-3',
        imgRoute4: 'route-4',
      };

      const allowedExts = ['jpg', 'jpeg', 'png'];
      const fs = require('fs');
      const path = require('path');

      // 2. Procesar y guardar las imágenes
      for (const key in imageMap) {
        const file = files[key]?.[0];
        if (file) {
          const ext = file.originalname.split('.').pop()?.toLowerCase();
          if (!ext || !allowedExts.includes(ext)) {
            throw new Error(`Formato inválido en ${key}`);
          }

          const fileName = `${created.id}.${ext}`;
          const filePath = `uploads/documents/imgs/${imageMap[key]}/${fileName}`;
          const fullPath = path.resolve(filePath);
          fs.mkdirSync(path.dirname(fullPath), { recursive: true });
          fs.writeFileSync(fullPath, file.buffer);

          updateData[key] = filePath;
        }
      }

      // 3. Actualizar la ruta con los paths de imagen
      return await this.routeMapsRepository.update(created.id, updateData);
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
    body: { description?: string },
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

      const updateData: any = {};
      if (body.description) updateData.description = body.description;

      const imageMap = {
        imgRoute1: 'route-1',
        imgRoute2: 'route-2',
        imgRoute3: 'route-3',
        imgRoute4: 'route-4',
      };

      const allowedExts = ['jpg', 'jpeg', 'png'];
      const fs = require('fs');
      const path = require('path');

      for (const key in imageMap) {
        const file = files[key]?.[0];
        if (file) {
          const ext = file.originalname.split('.').pop()?.toLowerCase();
          if (!ext || !allowedExts.includes(ext)) {
            throw new Error(`Formato inválido en ${key}`);
          }

          const fileName = `${id}.${ext}`;
          const filePath = `uploads/documents/imgs/${imageMap[key]}/${fileName}`;
          const fullPath = path.resolve(filePath);
          fs.mkdirSync(path.dirname(fullPath), { recursive: true });
          fs.writeFileSync(fullPath, file.buffer);
          updateData[key] = filePath;
        }
      }

      return await this.routeMapsRepository.update(id, updateData);
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }
}
