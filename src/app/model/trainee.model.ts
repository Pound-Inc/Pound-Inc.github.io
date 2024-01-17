import { UserLocation } from './location.model';
import { Gender, RoleType, User } from './user.model';

export class Trainee extends User {
  constructor(
    _id: string,
    name: string,
    email: string,
    dob: string,
    img: string,
    roles: RoleType,
    address: UserLocation,
    gender: Gender,
    public ip: string,
    public height: number,
    public weight: number,
    public level: LevelType,
    public goals: GoalType
  ) {
    super(_id, name, email, dob, img, address, roles, gender);
  }
  [key: string]: any; //  allow indexing with strings
}
export type GoalType = {
  weightLoss: boolean;
  cut: boolean;
  bulk: boolean;
};
export type LevelType = {
  beginner: string;
  intermediate: string;
  advanced: string;
};
export type GenderType = {
  male: string;
  female: string;
};
