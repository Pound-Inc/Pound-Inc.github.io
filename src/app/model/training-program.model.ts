import { TrainingPlan } from './program-plan.model';

export class TrainingProgram {
  constructor(
    public programId: string,
    public title: string,
    public img: string,
    public description: string,
    public plans: TrainingPlan[] = []
  ) {}
}
