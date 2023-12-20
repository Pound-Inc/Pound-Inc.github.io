export class UserLocation {
  constructor(
    public country: string,
    public city: string,
    public postal_code: string,
    public street: string,
    public street_2?: string
  ) {}
  [key: string]: any; //  allow indexing with strings

}
