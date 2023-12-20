export class Receipt {
  constructor(
    public id: string,
    public plan_id: string,
    public purchased_by_id: string
  ) {}
}
