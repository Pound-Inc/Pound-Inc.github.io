import { UserLocation } from "./location.model";

export enum UserRole {
  Worker = 'worker',
  Admin = 'admin',
  Super = 'super',
  mod = 'mod',
  User = 'user',
}
export enum Gender {
  Male = 'male',
  Female = 'female',
}

export class User {
  constructor(
    public _id: string,
    public name: string,
    public email: string,
    public dob: string,
    public img: string,
    public address: UserLocation,
    public roles: UserRole,
    public gender: Gender
  ) {}
  [key: string]: any; //  allow indexing with strings
}

export const UserRoles: UserRole[] = [
  UserRole.Admin,
  UserRole.Worker,
  UserRole.User,
];
