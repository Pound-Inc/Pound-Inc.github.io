import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlanService } from 'src/app/admin/services/plan.service';
import { Coach } from 'src/app/model/coach.model';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { TrainingProgram } from 'src/app/model/training-program.model';

@Component({
  selector: 'app-create-plan-modal',
  templateUrl: './create-plan-modal.component.html',
  styleUrls: ['./create-plan-modal.component.scss'],
})
export class CreatePlanModalComponent implements OnInit {
  planForm: FormGroup;
  @Input() coach: Coach;
  @Input() plan: ProgramPlan;
  @Input() program: TrainingProgram;

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder, private planService: PlanService) {}

  ngOnInit(): void {
    this.planForm = this.fb.group({
      plan_id: [this.plan._id, Validators.required],
      coach_id: [this.coach._id, Validators.required],
      program_id: [this.program._id, Validators.required],
      name: [this.plan.name, Validators.required],
      description: [this.plan.description, Validators.required],
      price: [this.plan.price, Validators.required],
      delivery_days: [this.plan.delivery_days, Validators.required],
    });

    this.planForm.get('plan_id')?.disable();
    this.planForm.get('coach_id')?.disable();
    this.planForm.get('program_id')?.disable();
  }

  async onSubmit() {
    if (this.planForm.invalid) {
      return;
    }
    const planData = this.planForm.value;
    const modifiedPlan = {
      _id: this.plan._id,
      program_id: this.program._id,
      coach_id: this.coach._id,
      name: this.planForm.value.name,
      description: this.planForm.value.description,
      price: this.planForm.value.price,
      delivery_days: this.planForm.value.delivery_days,
    };

    await this.planService.modifyPlan(modifiedPlan);
    this.closeModal.emit(true);
  }
}
