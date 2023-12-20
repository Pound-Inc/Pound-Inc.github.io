import { UserLocation } from './location.model';
import { Gender, User, UserRole } from './user.model';

export class Coach extends User {
  constructor(
    id: string,
    name: string,
    email: string,
    dob: string,
    img: string,
    role: UserRole,
    location: UserLocation,
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
    super(id, name, email, dob, img, location, role, gender);
  }
  [key: string]: any; //  allow indexing with strings
}
