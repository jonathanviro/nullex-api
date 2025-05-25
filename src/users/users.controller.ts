import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, ResponseUserDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/core/guards/permissions.guard';
import { Permissions } from 'src/core/decorators/permissions.decorator';
import { PERMISSIONS } from 'src/common/constants/permissions.constant';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CurrentUserPayload } from 'src/auth/interfaces/current-user.interface';
import { SuccessMessage } from 'src/core/decorators/success-message.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@CurrentUser() user: CurrentUserPayload) {
    const userId = user.id;
    const foundUser = await this.usersService.findOne(userId);
    return foundUser.toResponse();
  }

  @Permissions(PERMISSIONS.USERS.CREATE)
  @SuccessMessage('Usuario creado exitosamente')
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const user = await this.usersService.create(createUserDto);
    return new ResponseUserDto(user);
  }

  @Permissions(PERMISSIONS.USERS.READ)
  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => new ResponseUserDto(user));
  }

  @Permissions(PERMISSIONS.USERS.READ)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    const user = await this.usersService.findOne(id);
    return new ResponseUserDto(user);
  }

  @Permissions(PERMISSIONS.USERS.UPDATE)
  @SuccessMessage('Usuario actualizado correctamente')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const user = await this.usersService.update(id, updateUserDto);
    return new ResponseUserDto(user);
  }

  @Permissions(PERMISSIONS.USERS.DELETE)
  @SuccessMessage('Usuario eliminado correctamente')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.usersService.remove(id);
  }
}
