export class Addon {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public selected: boolean,
    public read_more: boolean,
    public icon: string
  ) {}
  [key: string]: any; //  allow indexing with strings
}
