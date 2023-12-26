export class ArticleComment {
  constructor(
    public _id: string,
    public user_id: string,
    public date: Date,
    public replays: ArticleComment[]
  ) {}
  [key: string]: any; //  allow indexing with strings
}

export class ProgramComment {
  constructor(
    public _id: string,
    public program_id: string,
    public user_id: string,
    public comment: string,
    public date: Date,
    public replays: ProgramComment[],
    public rating: number
  ) {}
  [key: string]: any; //  allow indexing with strings
}
