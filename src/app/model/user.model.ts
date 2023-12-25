import { UserLocation } from './location.model';

export enum RoleEnum {
  Super = 'Super',
  Admin = 'Admin',
  Mod = 'Mod',
  Worker = 'Worker',
  User = 'User',
  Guest = 'Guest',
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
    public roles: RoleType,
    public gender: Gender
  ) {}
  [key: string]: any; //  allow indexing with strings
}

export type RoleType = {
  [key in RoleEnum]: boolean;
};
