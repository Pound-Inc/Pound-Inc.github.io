import { Component, OnInit } from '@angular/core';
import { CreateProgramModalComponent } from './create-program-modal/create-program-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Coach } from 'src/app/model/coach.model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-worker-dashboard',
  templateUrl: './worker-dashboard.component.html',
  styleUrls: ['./worker-dashboard.component.scss'],
})
export class WorkerDashboardComponent implements OnInit {
  private coach: Coach;
  constructor(
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser.subscribe(async (coach: Coach) => {
      this.coach = coach;
    });
  }
  openCreateProgramModal() {
    const modalRef = this.modalService.open(CreateProgramModalComponent, {
      size: 'xl',
    });

    modalRef.componentInstance.coach = this.coach;

    modalRef.componentInstance.closeModal.subscribe(() => {
      modalRef.close();
    });
  }
  openModifyPlanModal() {
    const modalRef = this.modalService.open(CreateProgramModalComponent, {
      size: 'xl',
    });

    modalRef.componentInstance.coach = this.coach;

    modalRef.componentInstance.closeModal.subscribe(() => {
      modalRef.close();
    });
  }
}
