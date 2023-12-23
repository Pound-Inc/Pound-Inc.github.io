export class ProgramPlan {
  constructor(
    public _id: string,
    public program_id: string,
    public name: string,
    public description: string,
    public price: number,
    public delivery_days: number
  ) {}

  [key: string]: any; //  allow indexing with strings
}
