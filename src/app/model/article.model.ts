export class Article {
  constructor(
    public id: string,
    public name: string,
    public content: string,
    public published_by_id: string
  ) {}
  [key: string]: any; //  allow indexing with strings
}
