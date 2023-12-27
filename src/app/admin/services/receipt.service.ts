import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Receipt } from 'src/app/model/receipt.model';

const RECEIPT: Receipt[] = [
  {
    _id: 'R10002',
    plan_id: '6589c7ed067f800f032cb38d',
    purchased_by_id: 'U1000a9',
  },
  {
    _id: 'R10004',
    plan_id: '6589c7ed067f800f032cb38d',
    purchased_by_id: 'U1000a9Ddd',
  },
  {
    _id: 'R10004',
    plan_id: '6589c7ed067f800f032cb38d',
    purchased_by_id: 'U1000a9Ddd',
  },
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
  public getReceiptsTemp() {
    return RECEIPT;
  }
}
