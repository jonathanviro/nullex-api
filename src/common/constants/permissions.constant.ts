import { ROUTES } from '@nestjs/core/router/router-module';

export const PERMISSIONS = {
  ROLES: {
    CREATE: 'role.create',
    READ: 'role.read',
    UPDATE: 'role.update',
    DELETE: 'role.delete',
    ASSIGN: 'role.assign',
  },
  USERS: {
    CREATE: 'user.create',
    READ: 'user.read',
    UPDATE: 'user.update',
    DELETE: 'user.delete',
  },
  MODULES: {
    CREATE: 'module.create',
    READ: 'module.read',
    UPDATE: 'module.update',
    DELETE: 'module.delete',
  },
  PERMISSIONS: {
    CREATE: 'permission.create',
    READ: 'permission.read',
    UPDATE: 'permission.update',
    DELETE: 'permission.delete',
  },
  ROUTES_MAPS: {
    CREATE: 'route-map.create',
    READ: 'route-map.read',
    UPDATE: 'route-map.update',
    DELETE: 'route-map.delete',
  },
};
