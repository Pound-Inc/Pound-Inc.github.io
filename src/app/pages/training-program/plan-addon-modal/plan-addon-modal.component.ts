import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Addon } from 'src/app/model/addon.model';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { addons } from 'src/common/constants/addons';

@Component({
  selector: 'app-plan-addon-modal',
  templateUrl: './plan-addon-modal.component.html',
  styleUrls: ['./plan-addon-modal.component.scss'],
})
export class PlanAddonModalComponent {
  public translateBaseRoute = 'routing.program.';
  @Input() program: TrainingProgram;
  @Input() plan: ProgramPlan;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) {}
  addons: Addon[] = addons;

  toggleAddon(addon: any): void {
    addon.selected = !addon.selected;
  }
  selectedAddons(): any[] {
    return this.addons.filter((addon) => addon.selected);
  }

  getTotalAmount(): number {
    // Calculate total amount based on selected addons and main product
    let totalAmount = this.plan.price;

    this.addons.forEach((addon) => {
      if (addon.selected) {
        totalAmount += addon.price;
      }
    });

    return totalAmount;
  }

  sendDataAndCloseModal() {
    this.closeModal.emit(true);
  }

  setCart() {
    const cart = {
      main: this.plan,
      addons: this.selectedAddons(),
    };
    this.closeModal.emit(true);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.router.navigate(['/cart']);
  }
}
