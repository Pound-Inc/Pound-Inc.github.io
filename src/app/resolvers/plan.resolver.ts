import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { PlanService } from '../admin/services/plan.service';

export const plansResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot
) => {
  const plansService = inject(PlanService);

};
