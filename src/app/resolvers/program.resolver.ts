import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ProgramService } from '../admin/services/program.service';
import { TrainingProgram } from '../model/training-program.model';
import { UserService } from '../admin/services/user.service';
import { Coach } from '../model/coach.model';
import { PlanService } from '../admin/services/plan.service';
import { ReceiptService } from '../admin/services/receipt.service';
import { CommentService } from '../admin/services/comment.service';
import { StoryService } from '../admin/services/story.service';

export const programResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot
) => {
  const programService = inject(ProgramService);
  const userService = inject(UserService);
  const plansService = inject(PlanService);
  const commentService = inject(CommentService);
  const storyService = inject(StoryService);
  const receiptService = inject(ReceiptService);
  const programId = route.params['programId'];

  const plans = (await plansService.getRelatedPlans(programId)).data;
  const comments = (await commentService.getRelatedComments(programId)).data;
  const stories = (await storyService.getRelatedStories(programId)).data;
  const receipts = receiptService.getReceiptsTemp();

  const program: TrainingProgram = await programService.getProgramById(
    programId
  );

  const coach: Coach = await userService.getUserById(program.coach_id);

  return {
    coach: coach,
    program: program,
    plans: plans,
    receipts: receipts,
    comments: comments,
    stories: stories,
  };
};
