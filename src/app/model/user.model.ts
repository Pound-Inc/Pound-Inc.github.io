export enum UserRole {
  Worker = 'worker',
  Admin = 'admin',
  Super = 'super',
  mod = 'mod',
  User = 'user',
}

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public dob: string,
    public img: string,
    public location: string,
    public role: UserRole
  ) {}
  [key: string]: any; //  allow indexing with strings
}


export const UserRoles: UserRole[] = [UserRole.Admin, UserRole.Worker, UserRole.User];