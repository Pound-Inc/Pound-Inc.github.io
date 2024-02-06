import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/admin/services/comment.service';
import { OnboardingService } from 'src/app/admin/services/onboarding.service';
import { ProgramService } from 'src/app/admin/services/program.service';
import { UserService } from 'src/app/admin/services/user.service';
import { ProgramComment } from 'src/app/model/comment.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { User } from 'src/app/model/user.model';
import { register } from 'swiper/element';

@Component({
  selector: 'app-onboarding-step13',
  templateUrl: './onboarding-step13.component.html',
  styleUrls: ['./onboarding-step13.component.scss'],
})
export class OnboardingStep13Component implements OnInit {
  public comments: ProgramComment[];
  public programs: TrainingProgram[];
  public users: User[];
  loadingText: string;
  isLoading: boolean = false;

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private programService: ProgramService,
    private onboardingService: OnboardingService
  ) {
    register();
  }

  async ngOnInit() {
    this.programs = await this.programService.getPrograms();
    this.comments = (await this.commentService.getComments()).slice(0, 5);
    this.users = await this.userService.getUsers();

    this.isLoading = true;
    this.updateLoadingText(0);
  }

  updateLoadingText(progress: number) {
    const delay = Math.floor(Math.random() * 1000) + 1000; // Random delay between 500 and 1000 milliseconds

    setTimeout(() => {
      const nextProgress = progress + Math.floor(Math.random() * 10) + 5; // Increase between 10 and 30
      this.loadingText = `${nextProgress}`;

      if (nextProgress < 100) {
        this.updateLoadingText(nextProgress); // Continue updating until 100%
      } else {
        this.loadingText = `100`;
        this.isLoading = false; // Loading completed
      }
    }, delay);
  }

  getRelatedUser(userId: string) {
    return this.users.find((u) => u._id === userId);
  }
  getRelatedProgram(programId: string) {
    return this.programs.find((p) => p._id === programId);
  }

  getSlidesPerView(): string {
    if (window.innerWidth >= 992) {
      return '3';
    } else if (window.innerWidth >= 576) {
      return '2';
    } else {
      return '1';
    }
  }

  public getStarRange(): number[] {
    return Array.from({ length: 5 }, (_, index) => index);
  }

  onSubmitStep(): void {
    const data = { step: 12, data: null };
    this.onboardingService.setCurrentStepData(data);
  }
}
