import { User, UserRole } from './user.model';

export class Coach extends User {
  constructor(
    id: string,
    name: string,
    email: string,
    dob: string,
    img: string,
    role: UserRole,
    location: string,
    public availability: string,
    public is_verified: boolean,
    public verified_by: string,
    public languages: string[],
    public ratings: [],
    public tags: { name: string; color: string }[]
  ) {
    super(id, name, email, dob, img, location, role);
  }
  [key: string]: any; //  allow indexing with strings
}
