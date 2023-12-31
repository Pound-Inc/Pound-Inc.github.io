import { Addon } from './addon.model';
import { ProgramPlan } from './program-plan.model';

export class Order {
  constructor(
    public _id: string,
    public user_id: string,
    public items: any[],
    public addons: Addon[],
    public price: number,
    public status: OrderStatus,
    public clientSecret: string
  ) {}
  [key: string]: any; //  allow indexing with strings
}

export enum OrderStatusEnum {
  Delivered = 'Delivered',
  Canceled = 'Canceled',
  Closed = 'Closed',
  Completed = 'Completed',
  InProgress = 'InProgress',
  New = 'New',
}

export type OrderStatus =
  | OrderStatusEnum.Delivered
  | OrderStatusEnum.Canceled
  | OrderStatusEnum.Closed
  | OrderStatusEnum.Completed
  | OrderStatusEnum.InProgress
  | OrderStatusEnum.New;
