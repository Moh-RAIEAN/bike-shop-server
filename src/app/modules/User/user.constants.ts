const userRolesMapper = {
  customer: 'customer',
  admin: 'admin',
} as const;

const userRoles = Object.keys(userRolesMapper);
export const UserConstants = {
  userRolesMapper,
  userRoles,
};
