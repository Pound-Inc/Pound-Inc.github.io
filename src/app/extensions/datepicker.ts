import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  getWeekdayShortName(weekday: number): string {
    return weekday.toString();
  }

  getMonthShortName(month: number): string {
    return month.toString();
  }

  getMonthFullName(month: number): string {
    return month.toString();
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return date.toString();
  }

  getWeekdayLabel(weekday: number): string {
    return '';
  }
}
