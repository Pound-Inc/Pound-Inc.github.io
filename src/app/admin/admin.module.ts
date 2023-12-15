import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ManageCrisesComponent } from './manage-crises/manage-crises.component';
import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';
import { MatTableModule } from '@angular/material/table';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CountryService } from './country.service';
import { NgbdSortableHeader } from './sortable.directive';

@NgModule({
  declarations: [
    AdminComponent,
    ManageCrisesComponent,
    ManageHeroesComponent,
    AdminDashboardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DecimalPipe,
    FormsModule,
    AsyncPipe,
    NgbHighlight,
    NgbdSortableHeader,
    NgbPaginationModule,
  ],
  providers: [CountryService, DecimalPipe],
})
export class AdminModule {}
