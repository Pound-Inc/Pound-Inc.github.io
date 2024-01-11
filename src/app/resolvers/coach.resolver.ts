import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { UserService } from '../admin/services/user.service';
import { ProgramService } from '../admin/services/program.service';
import { StoryService } from '../admin/services/story.service';
import { TrainingProgram } from '../model/training-program.model';
import { ReceiptService } from '../admin/services/receipt.service';
import { PlanService } from '../admin/services/plan.service';
import { ProgramPlan } from '../model/program-plan.model';

export const coachResolver: ResolveFn<any> = async (
  route: ActivatedRouteSnapshot
) => {
  const userService = inject(UserService);
  const programService = inject(ProgramService);
  const storyService = inject(StoryService);
  const receiptService = inject(ReceiptService);
  const planService = inject(PlanService);
  const coachId = route.params['coachId'];


  const programs = await programService.getPrograms();
  const relatedPrograms = programs.filter((p) => p.coach_id === coachId);
  let relatedStories: any[] = [];
  let relatedReceipts: any[] = [];
  const receipts = receiptService.getReceiptsTemp();
  let relatedPlans: any[] = [];
  if (relatedPrograms) {
    for (const program of relatedPrograms) {
      const plans = (await planService.getRelatedPlans(program._id))
        .data as any[];
      relatedPlans = [...relatedPlans, ...plans];
      const story = (await storyService.getRelatedStories(program._id)).data;
      relatedStories = [...relatedStories, ...story];
    }
  }

  if (relatedPlans) {
    for (const plan of relatedPlans) {
      const planReceipts = receipts.filter((r) => r.plan_id === plan._id);
      relatedReceipts = [...relatedReceipts, ...planReceipts];
    }
  }
  const users = (await userService.getUsers()).data;

  const coach = await userService.getUserById(coachId);

  return {
    coach: coach,
    users: users,
    programs: relatedPrograms,
    stories: relatedStories,
    plans: relatedPlans,
    receipts: relatedReceipts,
  };
};
