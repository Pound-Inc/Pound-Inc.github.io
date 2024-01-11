import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { UserService } from '../admin/services/user.service';
import { ProgramService } from '../admin/services/program.service';
import { StoryService } from '../admin/services/story.service';
import { TrainingProgram } from '../model/training-program.model';
import { PlanService } from '../admin/services/plan.service';
import { ProgramPlan } from '../model/program-plan.model';
import { OrderService } from '../admin/services/order.service';

export const coachResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot
) => {
  const userService = inject(UserService);
  const programService = inject(ProgramService);
  const storyService = inject(StoryService);
  const planService = inject(PlanService);
  const orderService = inject(OrderService);
  const coachId = route.params['coachId'];

  const programs = await programService.getPrograms();
  const orders = await orderService.getOrders();
  const relatedPrograms = programs.filter((p) => p.coach_id === coachId);
  let relatedStories: any[] = [];
  let relatedOrders: any[] = [];
  let relatedPlans: any[] = [];
  if (relatedPrograms) {
    for (const program of relatedPrograms) {
      const plans = await planService.getRelatedPlans(program._id);
      relatedPlans = [...relatedPlans, ...plans];
      const story = (await storyService.getRelatedStories(program._id)).data;
      relatedStories = [...relatedStories, ...story];
    }
  }

  if (relatedPlans) {
    for (const plan of relatedPlans) {
      const orders$ = orders.filter((o) => o.items[0]._id === plan._id);
      relatedOrders = [...relatedOrders, ...orders$];
    }
  }
  const users = await userService.getUsers();

  const coach = await userService.getUserById(coachId);

  return {
    coach: coach,
    users: users,
    programs: relatedPrograms,
    stories: relatedStories,
    plans: relatedPlans,
    orders: relatedOrders,
  };
};
