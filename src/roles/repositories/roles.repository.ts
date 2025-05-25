import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from '../dto';
import { RoleEntity } from '../entities/role.entity';
import { handleDatabaseErrors } from 'src/common/helpers/database-error.helper';

@Injectable()
export class RolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRoleDto): Promise<RoleEntity> {
    try {
      const role = await this.prisma.role.create({ data });
      return new RoleEntity(role);
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }

  async findAll(): Promise<RoleEntity[]> {
    const roles = await this.prisma.role.findMany();
    return roles.map((r) => new RoleEntity(r));
  }

  async findById(id: string): Promise<RoleEntity | null> {
    const role = await this.prisma.role.findUnique({ where: { id } });
    return role ? new RoleEntity(role) : null;
  }

  async update(id: string, data: UpdateRoleDto): Promise<RoleEntity> {
    try {
      const role = await this.prisma.role.update({ where: { id }, data });
      return new RoleEntity(role);
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.role.delete({ where: { id } });
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }

  async assignPermissions(
    roleId: string,
    permissionIds: string[],
  ): Promise<void> {
    try {
      await this.prisma.rolePermission.deleteMany({ where: { roleId } });

      await this.prisma.rolePermission.createMany({
        data: permissionIds.map((permissionId) => ({
          roleId,
          permissionId,
        })),
        skipDuplicates: true,
      });
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }

  async findWithPermissions(id: string): Promise<{
    role: RoleEntity;
    permissions: { id: string; name: string }[];
  } | null> {
    const roleWithPerms = await this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: {
          include: {
            permission: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    if (!roleWithPerms) return null;

    return {
      role: new RoleEntity(roleWithPerms),
      permissions: roleWithPerms.permissions.map((rp) => rp.permission),
    };
  }
}
