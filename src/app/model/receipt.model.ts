export class Receipt {
  constructor(
    public _id: string,
    public plan_id: string,
    public purchased_by_id: string
  ) {}
}
