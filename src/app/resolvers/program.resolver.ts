import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ProgramService } from '../admin/services/program.service';
import { TrainingProgram } from '../model/training-program.model';
import { UserService } from '../admin/services/user.service';
import { Coach } from '../model/coach.model';
import { PlanService } from '../admin/services/plan.service';
import { CommentService } from '../admin/services/comment.service';
import { StoryService } from '../admin/services/story.service';
import { User } from '../model/user.model';
import { OrderService } from '../admin/services/order.service';

export const programResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot
) => {
  const programService = inject(ProgramService);
  const userService = inject(UserService);
  const plansService = inject(PlanService);
  const commentService = inject(CommentService);
  const storyService = inject(StoryService);
  const orderService = inject(OrderService);
  const programId = route.params['programId'];

  const plans = await plansService.getRelatedPlans(programId);
  const comments = await commentService.getRelatedComments(programId);

  const stories = (await storyService.getRelatedStories(programId)).data;
  const orders = await orderService.getOrders();

  const program: TrainingProgram = await programService.getProgramById(
    programId
  );

  const coach: User = await userService.getUserById(program.coach_id);
  const users: User[] = await userService.getUsers();

  return {
    coach: coach,
    users: users,
    program: program,
    plans: plans,
    comments: comments,
    stories: stories,
    orders: orders,
  };
};
