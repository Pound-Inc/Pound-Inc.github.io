export class TrainingProgram {
  constructor(
    public _id: string,
    public coach_id: string,
    public name: string,
    public img: string,
    public description: string,
    public phases: Record<string, number>,
    public rating?: any[]
  ) {}

  [key: string]: any; //  allow indexing with strings
}
