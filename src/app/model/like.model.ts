export class Like {
  constructor(public _id: string, public liked_by_id: string) {}
  [key: string]: any; //  allow indexing with strings
}
