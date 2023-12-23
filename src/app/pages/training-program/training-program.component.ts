import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PlanService } from 'src/app/admin/services/plan.service';
import { ProgramService } from 'src/app/admin/services/program.service';
import { ReceiptService } from 'src/app/admin/services/receipt.service';
import { UserService } from 'src/app/admin/services/user.service';
import { Coach } from 'src/app/model/coach.model';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { Receipt } from 'src/app/model/receipt.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { User } from 'src/app/model/user.model';
import { planTableColumns } from 'src/common/columns';
import { DataGridColumn } from 'src/common/interfaces/datagrid.interface';
import { PlanCompareModalComponent } from './plan-compare-modal/plan-compare-modal.component';
import { ProgramComment } from 'src/app/model/comment.model';
import { ProgramCommentService } from 'src/app/admin/services/program.comment.service';

@Component({
  selector: 'app-training-program',
  templateUrl: './training-program.component.html',
  styleUrls: ['./training-program.component.scss'],
})
export class TrainingProgramComponent implements OnInit, OnDestroy {
  public translateBaseRoute = 'routing.program.';
  public coach: Coach;
  public users: User[];
  public program: TrainingProgram;
  public plans: ProgramPlan[];
  public receipts: Receipt[];
  public comments: ProgramComment[];
  public columns: DataGridColumn[] = planTableColumns;

  private programSubscription: Subscription;
  private receiptSubscription: Subscription;
  private planSubscription: Subscription;
  private userSubscription: Subscription;
  private programCommentSubscription: Subscription;

  constructor(
    private programService: ProgramService,
    private planService: PlanService,
    private receiptService: ReceiptService,
    private userService: UserService,
    private programCommentService: ProgramCommentService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    const programId = this.route.snapshot.paramMap.get('programId');
    this.programSubscription = this.programService.programs.subscribe(
      (programs: TrainingProgram[]) => {
        if (programs) {
          const program = programs.find((p) => p._id === programId);
          if (program) {
            this.program = program;
          } else {
            this.router.navigate(['/programs']);
          }
        }
      }
    );
    this.planSubscription = this.planService.plans.subscribe(
      (plans: ProgramPlan[]) => {
        if (plans) {
          const plan = plans.filter((p) => p.program_id === this.program._id);
          if (plan) {
            this.plans = plan;
          }
        }
      }
    );

    this.userSubscription = this.userService.users.subscribe(
      (users: User[] | Coach[]) => {
        if (users) {
          this.users = users;
          const coach = users.find(
            (u) => u._id === this.program.coach_id
          ) as Coach;

          if (coach) {
            this.coach = coach;
          }
        }
      }
    );

    this.receiptSubscription = this.receiptService
      .getReceipts()
      .subscribe((receipts: Receipt[]) => {
        this.receipts = receipts;
      });

    this.planSubscription = this.planService.plans.subscribe(
      (plans: ProgramPlan[]) => {
        const relatedPlans = plans.filter(
          (p) => p.program_id === this.program._id
        );
        if (relatedPlans) {
          this.plans = relatedPlans;
        }
      }
    );

    this.programCommentSubscription = this.programCommentService
      .getComments()
      .subscribe((comments: ProgramComment[]) => {
        if (comments) {
          const relatedComments = comments.filter(
            (comment) => comment.program_id === this.program._id
          );
          if (relatedComments.length > 0) {
            this.comments = comments;
          }
        }
      });
  }
  ngOnDestroy(): void {
    if (this.programSubscription) {
      this.programSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.planSubscription) {
      this.planSubscription.unsubscribe();
    }
    if (this.receiptSubscription) {
      this.receiptSubscription.unsubscribe();
    }
    if (this.programCommentSubscription) {
      this.programCommentSubscription.unsubscribe();
    }
  }

  public getRelatedPlans(programId: string): ProgramPlan[] | undefined {
    return this.plans
      ? this.plans.filter((plan) => plan.program_id === programId)
      : undefined;
  }
  public getRelatedUser(userId: string): User | undefined {
    return this.users
      ? this.users.find((user) => user._id === userId)
      : undefined;
  }

  public getRelatedReceipts(): Receipt[] {
    let receipts: Receipt[] = [];
    const relatedPlans = this.getRelatedPlans(this.program._id);
    if (relatedPlans)
      for (const plan of relatedPlans) {
        const receipt = this.receipts.find(
          (receipt) => receipt.plan_id === plan._id
        );
        if (receipt) {
          receipts.push(receipt);
        }
      }
    return receipts;
  }
  public getRelatedPlanReceipts(planId: string): Receipt[] {
    const receipts = this.receipts.filter(
      (receipt) => receipt.plan_id === planId
    );
    return receipts;
  }

  openXl() {
    const modalRef = this.modalService.open(PlanCompareModalComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.plans = this.plans;
    modalRef.componentInstance.program = this.program;
    modalRef.componentInstance.columns = this.columns;

    modalRef.componentInstance.closeModal.subscribe(() => {
      modalRef.close();
    });
  }

  public getColor(value: number): string {
    if (value >= 70) {
      // Light blue
      return '#5da8e1';
    } else if (value >= 40) {
      // Light green
      return '#a4c639';
    } else {
      // Light red
      return '#e57373';
    }
  }
}
