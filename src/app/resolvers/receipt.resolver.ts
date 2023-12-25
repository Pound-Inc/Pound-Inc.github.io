import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { PlanService } from '../admin/services/plan.service';
import { ReceiptService } from '../admin/services/receipt.service';

export const receiptResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot
) => {
  const plansService = inject(PlanService);
  const receiptService = inject(ReceiptService);
  const programId = route.params['programId'];

  //todo: every plan has amount orders, show them.
  //   const plans = await plansService.getRelatedPlans(programId);
  const receipts = receiptService.getReceipts();

  return receipts;
};
