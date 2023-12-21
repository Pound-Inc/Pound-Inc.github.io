import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProgramComment } from 'src/app/model/comment.model';

const COMMENTS: ProgramComment[] = [
  {
    id: 'PC40000',
    program_id: 'PR20003',
    comment_by_id: 'U1000a9',
    comment: 'hello! i really like this program',
    date: new Date(),
    replays: [
      {
        id: 'PC40100',
        comment_by_id: 'U1000da',
        comment: 'hello! i really like this program',
        program_id: 'PR20003',
        date: new Date(),
        replays: [],
      },
    ],
    rating: 4,
  },
];

@Injectable({ providedIn: 'root' })
export class ProgramCommentService {
  private comments$ = new BehaviorSubject<ProgramComment[]>([]);

  constructor() {
    this.setComments();
  }
  private setComments() {
    this.comments$.next(COMMENTS);
  }
  public getComments() {
    return this.comments$.asObservable();
  }
}
