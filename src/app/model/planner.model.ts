import { TrainingCard } from './training-card.model';

export class Planner {
  constructor(
    public _id: string,
    public order_id: string,
    public training_cards: TrainingCard[],
    public total_weeks: number,
    public status: PlannerStatus
    
  ) {}
  [key: string]: any; //  allow indexing with strings
}

export enum PlannerStatusEnum {
  Finished = 'Finished',
  Completed = 'Completed',
  InProgress = 'InProgress',
}

export type PlannerStatus =
  | PlannerStatusEnum.Finished
  | PlannerStatusEnum.Completed
  | PlannerStatusEnum.InProgress;
