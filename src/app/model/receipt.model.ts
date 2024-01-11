export class Receipt {
  constructor(
    public _id: string,
    public order_id: string,
    public issued_date: Date,
    public amount: number,
    public status: ReceiptStatus,
    public collected: number,
    public out_standing: number
  ) {}
  [key: string]: any; //  allow indexing with strings
}

export enum ReceiptStatusEnum {
Paid = 'Paid',
Draft = 'Draft',
Overdue = 'Overdue',
Sent = 'Sent',
Canceled = 'Canceled',
}

export type ReceiptStatus =
| ReceiptStatusEnum.Paid
| ReceiptStatusEnum.Canceled
| ReceiptStatusEnum.Overdue
| ReceiptStatusEnum.Sent
| ReceiptStatusEnum.Draft;