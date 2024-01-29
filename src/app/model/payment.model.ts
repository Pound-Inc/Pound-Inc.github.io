export class Payment {
  constructor(
    public _id: string,
    public order_id: string,
    public issued_date: Date,
    public amount: number,
    public status: PaymentStatus,
    public collected: number,
    public out_standing: number
  ) {}
}


export enum PaymentStatusEnum {
  Paid = 'Paid',
  Draft = 'Draft',
  Overdue = 'Overdue',
  Sent = 'Sent',
  Canceled = 'Canceled',
}

export type PaymentStatus =
  | PaymentStatusEnum.Paid
  | PaymentStatusEnum.Canceled
  | PaymentStatusEnum.Overdue
  | PaymentStatusEnum.Sent
  | PaymentStatusEnum.Draft;