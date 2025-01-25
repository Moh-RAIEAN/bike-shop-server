const userRolesMapper = {
  customer: 'customer',
  admin: 'admin',
} as const;

const userRoles = Object.keys(
  userRolesMapper,
) as unknown as (keyof typeof userRolesMapper)[];
export const UserConstants = {
  userRolesMapper,
  userRoles,
};
