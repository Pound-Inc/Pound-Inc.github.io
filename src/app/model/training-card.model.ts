export class TrainingCard {
  constructor(
    public title: string,
    public position: [number, number],
    public is_opened: boolean,
    public exercises: Exercise[]
  ) {}
  [key: string]: any; //  allow indexing with strings
}

export type Exercise = {
  name: string;
  sets: number;
  reps: number;
  description: string;
};
