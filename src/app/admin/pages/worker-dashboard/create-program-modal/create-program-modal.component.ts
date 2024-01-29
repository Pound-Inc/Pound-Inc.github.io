import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PlanService } from 'src/app/admin/services/plan.service';
import { ProgramService } from 'src/app/admin/services/program.service';
import { Coach } from 'src/app/model/coach.model';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { CreatePlanModalComponent } from '../create-plan-modal/create-plan-modal.component';
import { ImgbbService } from 'src/app/admin/services/imgbb.service';

@Component({
  selector: 'app-create-program-modal',
  templateUrl: './create-program-modal.component.html',
  styleUrls: ['./create-program-modal.component.scss'],
})
export class CreateProgramModalComponent implements OnInit {
  programForm: FormGroup;

  //new program?
  @Input() coach: Coach;
  @Input() name: string;
  @Input() img: string;
  @Input() fileimg: string;
  @Input() description: string;
  @Input() bulk: number;
  @Input() cut: number;
  @Input() muscle: number;

  //modify?
  @Input() programId: string;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private programService: ProgramService,
    private planService: PlanService,
    private config: NgbModalConfig,
    private readonly imgbbService: ImgbbService
  ) {}

  ngOnInit(): void {
    this.programForm = this.fb.group({
      coach_id: [this.coach._id, Validators.required],
      name: [this.name || '', Validators.required],
      img: [this.img, Validators.required],
      fileimg: [''],
      description: [this.description || '', Validators.required],
      bulk: [this.bulk || '', Validators.required],
      cut: [this.cut || '', Validators.required],
      muscle: [this.muscle || '', Validators.required],
      rating: [[]],
    });

    this.programForm.get('coach_id')?.disable();
    this.programForm.get('img')?.disable();
  }

  async onSubmit() {
    console.log(this.programForm);

    if (this.programForm.invalid) {
      return;
    }

    const programData = this.programForm.value;
    const newProgram = {
      coach_id: this.coach._id,
      name: this.programForm.value.name,
      img: this.img,
      description: this.programForm.value.description,
      phases: {
        bulk: this.programForm.value.bulk,
        cut: this.programForm.value.cut,
        muscle: this.programForm.value.muscle,
      },
    };

    if (this.programId !== undefined) {
      await this.programService.modifyProgramById(this.programId, newProgram);
      console.log('program modifed');
    } else {
      this.programService
        .createNewProgram(newProgram)
        .subscribe(async (createdProgram) => {
          await this.createThreeRelatedPlans(createdProgram);
        });
    }
  }
  async createThreeRelatedPlans(program: TrainingProgram) {
    for (let i = 1; i < 4; i++) {
      const plan = {
        coach_id: this.coach._id,
        program_id: program._id,
        name: `plan ${i}`,
        description: `plan ${i} description`,
        price: 0,
        delivery_days: 0,
      };

      await this.planService.createNewPlan(plan).then(async (createdPlan) => {
        await this.createAndSavePlanWithModal(createdPlan, program);
      });
    }

    return true;
  }

  async createAndSavePlanWithModal(plan: any, program: any) {
    const modalRef = this.modalService.open(CreatePlanModalComponent, {
      size: 'xl',
    });

    modalRef.componentInstance.coach = this.coach;
    modalRef.componentInstance.plan = plan;
    modalRef.componentInstance.program = program;

    // Wait for the modal to close
    const closeModal = new Promise<void>((resolve) => {
      modalRef.componentInstance.closeModal.subscribe(() => {
        resolve();
      });
    });

    // Wait for both the modal to close and the plan to be saved
    await Promise.all([closeModal]);
  }

  async onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      const imgbbLink = await this.imgbbService.upload(input.files[0]);
      this.img = imgbbLink;
    }
  }
}