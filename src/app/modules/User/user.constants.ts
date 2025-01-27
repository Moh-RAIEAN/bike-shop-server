import { TUser } from './user.interface';

const userRolesMapper = {
  customer: 'customer',
  admin: 'admin',
} as const;

const userStatusMapper = {
  active: 'active',
  blocked: 'blocked',
} as const;

const userRoles = Object.keys(
  userRolesMapper,
) as unknown as (keyof typeof userRolesMapper)[];

const userStatuses = Object.keys(
  userStatusMapper,
) as unknown as (keyof typeof userStatusMapper)[];

const searchableFields: (keyof TUser)[] = ['name', 'email'];

export const UserConstants = {
  userRolesMapper,
  userRoles,
  searchableFields,
  userStatusMapper,
  userStatuses,
};
