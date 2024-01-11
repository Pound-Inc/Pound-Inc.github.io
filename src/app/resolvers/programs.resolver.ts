import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ProgramService } from '../admin/services/program.service';
import { TrainingProgram } from '../model/training-program.model';
import { UserService } from '../admin/services/user.service';
import { PlanService } from '../admin/services/plan.service';
import { User } from '../model/user.model';

export const programsResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot
) => {
  const programService = inject(ProgramService);
  const userService = inject(UserService);
  const plansService = inject(PlanService);

  const plans = await plansService.getPlans();
  const programs = await programService.getPrograms();

  const users: User[] = await userService.getUsers();

  return {
    plans: plans,
    users: users,
    programs: programs,
  };
};
