import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { Country } from '../country';
import { CountryService } from '../country.service';
import { NgbdSortableHeader, SortEvent } from '../sortable.directive';
import { DecimalPipe, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

export interface Entry {
  Type: string;
  'Entry No.': string;
  'Job Task Description': string;
  'Posting Date': string;
  'No.': string;
  'Work Type Code': string;
  'Transaction Type': string;
  Description: string;
  Quantity: string;
  'Unit Cost': string;
  'Total Cost': string;
  'Unit Price': string;
  'Total Price': string;
  'Line Amount': string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  countries$: Observable<Country[]>;
  total$: Observable<number>;
  selectedCountry: any;
  queriedData: Country[] = [];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  onRowClick(country: any) {
    this.selectedCountry = country;
    this.queriedData = [this.selectedCountry];
    // Handle the row click event here
    // You can log the data or perform any other action
    console.log('Row clicked:', country);

    // If you want to convert the data to JSON
    const jsonData = JSON.stringify(country);
    console.log('Row data as JSON:', jsonData);
  }
  editRow() {
    // Handle the edit button click
    if (this.selectedCountry) {
      // Implement logic to open an edit form or perform other edit actions
      console.log('Edit button clicked for:', this.selectedCountry);
    }
  }

  deleteRow() {}
}
