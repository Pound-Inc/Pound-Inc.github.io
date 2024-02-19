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
import { ProgramStory } from 'src/app/model/story.model';
import { PlanAddonModalComponent } from './plan-addon-modal/plan-addon-modal.component';
import { Order } from 'src/app/model/order.model';

@Component({
  selector: 'app-training-program',
  templateUrl: './training-program.component.html',
  styleUrls: ['./training-program.component.scss'],
})
export class TrainingProgramComponent implements OnInit, OnDestroy {
  public coach: Coach;
  public users: User[];
  public program: TrainingProgram;
  public plans: ProgramPlan[];
  public orders: Order[];
  public comments: ProgramComment[];
  public stories: ProgramStory[];
  public columns: DataGridColumn[] = planTableColumns;

  private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute, private modalService: NgbModal) {}
  ngOnInit(): void {
    this.routeSubscription = this.route.data.subscribe((data) => {
      const programData: {
        coach: Coach;
        program: TrainingProgram;
        plans: ProgramPlan[];
        orders: Order[];
        comments: ProgramComment[];
        stories: ProgramStory[];
        users: User[];
      } = data['program'];

      this.program = programData.program;
      this.coach = programData.coach;
      this.plans = programData.plans;
      this.orders = programData.orders;
      this.comments = programData.comments;
      this.stories = programData.stories;
      this.users = programData.users;
    });
  }
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  public getRelatedOrders(planId: string) {
    const relatedOrders = this.orders.filter((o) => o.items[0]._id === planId);

    return relatedOrders;
  }

  compareBtn() {
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

  addOnBtn(plan: ProgramPlan) {
    const modalRef = this.modalService.open(PlanAddonModalComponent, {
      size: 'md',
    });
    modalRef.componentInstance.plan = plan;
    modalRef.componentInstance.program = this.program;

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

  public getRelatedUsers(userId: string): User | undefined {
    return this.users
      ? this.users.find((user) => user._id === userId)
      : undefined;
  }
}
