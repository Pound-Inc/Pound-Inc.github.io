import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ProgramService } from '../admin/services/program.service';
import { TrainingProgram } from '../model/training-program.model';
import { UserService } from '../admin/services/user.service';
import { PlanService } from '../admin/services/plan.service';
import { User } from '../model/user.model';
import { OrderService } from '../admin/services/order.service';

export const cardioResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot
) => {
  const programService = inject(ProgramService);
  const userService = inject(UserService);
  const plansService = inject(PlanService);
  const orderService = inject(OrderService);

  const plans = await plansService.getPlans();
  const orders = await orderService.getOrders();

  const programs = (await programService.getPrograms()).filter(
    (p) => p.phases['cut'] > 80 && p.phases['bulk'] === 0
  );

  const programsData = programs.map((program) => {
    let relatedOrders = [];
    for (const order of orders) {
      const orders$ = order.items.filter((i) => i.program_id === program._id);
      relatedOrders.push(...orders$);
    }
    return {
      ...program,
      orders: relatedOrders.length,
    };
  });

  const users: User[] = await userService.getUsers();

  return {
    plans: plans,
    users: users,
    programs: programsData,
  };
};
