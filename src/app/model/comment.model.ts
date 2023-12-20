export class ArticleComment {
  constructor(
    public id: string,
    public comment_by_id: string,
    public date: Date,
    public replays: ArticleComment[]
  ) {}
  [key: string]: any; //  allow indexing with strings
}
