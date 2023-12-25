import { Component, Input, OnInit } from '@angular/core';
import { Coach } from 'src/app/model/coach.model';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { Receipt } from 'src/app/model/receipt.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-coach-card',
  templateUrl: './coach-card.component.html',
  styleUrls: ['./coach-card.component.scss'],
})
export class CoachCardComponent implements OnInit {
  @Input() translateBaseRoute: string;
  @Input() coach: Coach;
  @Input() relatedPrograms: TrainingProgram[] | undefined;
  @Input() relatedCertifier: User | undefined;
  @Input() relatedReceipts: Receipt[];

  constructor() {}

  ngOnInit(): void {
    console.log(this.coach);
  }
}
