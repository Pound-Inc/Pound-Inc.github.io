import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Receipt } from 'src/app/model/receipt.model';

const RECEIPT: Receipt[] = [
  { _id: 'R10002', plan_id: 'PP30001', purchased_by_id: 'U1000a9' },
  { _id: 'R10004', plan_id: 'PP30005', purchased_by_id: 'U1000a9' },
];

@Injectable({ providedIn: 'root' })
export class ReceiptService {
  private receipt$ = new BehaviorSubject<Receipt[]>([]);

  constructor() {
    this.setReceipts();
  }
  private setReceipts() {
    this.receipt$.next(RECEIPT);
  }
  public getReceipts() {
    return this.receipt$.asObservable();
  }
}
