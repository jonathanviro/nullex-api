import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { RouteMapsService } from './route-maps.service';
import { CreateRouteMapDto, UpdateRouteMapDto } from './dto';
import { RouteMapEntity } from './entities/route-map.entity';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/core/guards/permissions.guard';
import { Permissions } from 'src/core/decorators/permissions.decorator';
import { SuccessMessage } from 'src/core/decorators/success-message.decorator';
import { PERMISSIONS } from 'src/common/constants/permissions.constant';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('route-maps')
export class RouteMapsController {
  constructor(private readonly routeMapsService: RouteMapsService) {}

  @Post()
  @Permissions(PERMISSIONS.ROUTES_MAPS.CREATE)
  @SuccessMessage('Ruta del mapa creada exitosamente')
  async create(@Body() dto: CreateRouteMapDto): Promise<RouteMapEntity> {
    return this.routeMapsService.create(dto);
  }

  @Get()
  @Permissions(PERMISSIONS.ROUTES_MAPS.READ)
  async find(): Promise<RouteMapEntity> {
    return this.routeMapsService.find();
  }

  @Get('all')
  @Permissions(PERMISSIONS.ROUTES_MAPS.READ)
  async findAll(): Promise<RouteMapEntity[]> {
    return this.routeMapsService.findAll();
  }

  @Get(':id')
  @Permissions(PERMISSIONS.ROUTES_MAPS.READ)
  async findById(@Param('id') id: string): Promise<RouteMapEntity> {
    return this.routeMapsService.findById(id);
  }

  @Patch(':id')
  @Permissions(PERMISSIONS.ROUTES_MAPS.UPDATE)
  @SuccessMessage('Ruta del mapa actualizada exitosamente')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRouteMapDto,
  ): Promise<RouteMapEntity> {
    return this.routeMapsService.update(id, dto);
  }

  @Patch(':id/upload-images')
  @Permissions(PERMISSIONS.ROUTES_MAPS.UPDATE)
  @SuccessMessage('Imágenes de ruta actualizadas exitosamente')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imgRoute1', maxCount: 1 },
      { name: 'imgRoute2', maxCount: 1 },
      { name: 'imgRoute3', maxCount: 1 },
      { name: 'imgRoute4', maxCount: 1 },
    ]),
  )
  async uploadImages(
    @Param('id') id: string,
    @UploadedFiles()
    files: {
      imgRoute1?: Express.Multer.File[];
      imgRoute2?: Express.Multer.File[];
      imgRoute3?: Express.Multer.File[];
      imgRoute4?: Express.Multer.File[];
    },
  ): Promise<RouteMapEntity> {
    return this.routeMapsService.uploadImages(id, files);
  }
}
