import { Component, Input } from '@angular/core';
import { Coach } from 'src/app/model/coach.model';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { Receipt } from 'src/app/model/receipt.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-coach-programs',
  templateUrl: './coach-programs.component.html',
  styleUrls: ['./coach-programs.component.scss'],
})
export class CoachProgramsComponent {
  @Input() translateBaseRoute: string;
  @Input() coach: Coach;
  @Input() relatedPrograms: TrainingProgram[] | undefined;
  @Input() relatedCertifier: User | undefined;
  @Input() relatedReceipts: Receipt[];
  @Input() relatedPlans: ProgramPlan[];

  public startingPrice(programId: string) {
    const plan = this.relatedPlans.find((p) => p.program_id === programId);
    return plan ? plan.price : 0;
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
