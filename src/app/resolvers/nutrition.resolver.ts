import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ProgramService } from '../admin/services/program.service';
import { TrainingProgram } from '../model/training-program.model';
import { UserService } from '../admin/services/user.service';
import { PlanService } from '../admin/services/plan.service';
import { ReceiptService } from '../admin/services/receipt.service';
import { User } from '../model/user.model';

export const nutritionResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot
) => {
  const programService = inject(ProgramService);
  const userService = inject(UserService);
  const plansService = inject(PlanService);
  const receiptService = inject(ReceiptService);

  const plans = (await plansService.getPlans()).data;
  const receipts = receiptService.getReceiptsTemp();

  const programs = (await programService.getPrograms()).filter(
    (p) => p.phases['cut'] > 90
  );

  const users: User[] = (await userService.getUsers()).data;

  return {
    plans: plans,
    receipts: receipts,
    users: users,
    programs: programs,
  };
};
