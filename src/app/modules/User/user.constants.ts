import { TUser } from './user.interface';

const userRolesMapper = {
  customer: 'customer',
  admin: 'admin',
} as const;

const userRoles = Object.keys(
  userRolesMapper,
) as unknown as (keyof typeof userRolesMapper)[];

const searchableFields: (keyof TUser)[] = ['name', 'email'];

export const UserConstants = {
  userRolesMapper,
  userRoles,
  searchableFields,
};
