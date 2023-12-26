export class ProgramStory {
  constructor(
    public _id: string,
    public program_id: string,
    public user_id: string,
    public title: string,
    public duration: string,
    public description: string,
    public date: Date,
    public imgs: string[]
  ) {}
  [key: string]: any; //  allow indexing with strings
}
