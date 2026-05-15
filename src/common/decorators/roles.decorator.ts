import { SetMetadata } from '@nestjs/common';

export enum RoleName {
  ADMIN = 'ADMIN',
  CLIENTE = 'CLIENTE',
  ALUMNO = 'ALUMNO',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleName[]) => SetMetadata(ROLES_KEY, roles);
