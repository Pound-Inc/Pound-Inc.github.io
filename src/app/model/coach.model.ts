import { UserLocation } from './location.model';
import { Gender, User, UserRole } from './user.model';

export class Coach extends User {
  constructor(
    _id: string,
    name: string,
    email: string,
    dob: string,
    img: string,
    roles: UserRole,
    address: UserLocation,
    gender: Gender,
    public description: string,
    public availability: string,
    public is_verified: boolean,
    public certified_by_id: string,
    public certification_id: string,
    public languages: string[],
    public stars: number,
    public ratings: [],
    public tags: { name: string; color: string; icon?: string }[]
  ) {
    super(_id, name, email, dob, img, address, roles, gender);
  }
  [key: string]: any; //  allow indexing with strings
}
