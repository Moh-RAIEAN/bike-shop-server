import { BloodGroups, Genders, Statuses, UserRoles } from '../constants';

export type TUserRoles = (typeof UserRoles)[number];
export type TBloodGroups = (typeof BloodGroups)[number];
export type TGenders = (typeof Genders)[number];
export type TStatuses = (typeof Statuses)[number];

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
