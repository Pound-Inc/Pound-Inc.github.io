export class ProgramPlan {
  constructor(
    public id: string,
    public program_id: string,
    public name: string,
    public description: string,
    public price: number
  ) {}

  [key: string]: any; //  allow indexing with strings
}
