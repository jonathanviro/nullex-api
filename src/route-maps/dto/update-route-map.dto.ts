import { PartialType } from '@nestjs/mapped-types';
import { CreateRouteMapDto } from './create-route-map.dto';

export class UpdateRouteMapDto extends PartialType(CreateRouteMapDto) {}
