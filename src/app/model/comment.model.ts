export class ArticleComment {
  constructor(
    public id: string,
    public comment_by_id: string,
    public date: Date,
    public replays: ArticleComment[]
  ) {}
  [key: string]: any; //  allow indexing with strings
}

export class ProgramComment {
  constructor(
    public id: string,
    public program_id: string,
    public comment_by_id: string,
    public comment: string,
    public date: Date,
    public replays: ProgramComment[],
    public rating?: number
  ) {}
  [key: string]: any; //  allow indexing with strings
}
