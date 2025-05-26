import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRouteMapDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}
