import { UserLocation } from './location.model';
import { Gender, RoleType, User } from './user.model';

export class OnboardingUserInfo extends User {
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
    public body_info: {
      height: number;
      weight: number;
      dream_weight: number;
      pain_areas: string[];
      body_shape: string;
      dream_body_shape: string;
      last_time_best_body_shape: string;
    }
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
