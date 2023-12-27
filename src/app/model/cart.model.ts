import { Addon } from './addon.model';
import { ProgramPlan } from './program-plan.model';

export class Cart {
  constructor(public main: ProgramPlan, public addons: Addon[]) {}
  [key: string]: any; //  allow indexing with strings
}
