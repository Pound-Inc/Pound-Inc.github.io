import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProgramComment } from 'src/app/model/comment.model';

const COMMENTS: ProgramComment[] = [
  {
    _id: 'PC40000',
    program_id: '658714dca67a415a29c58936',
    comment_by_id: '6588917e47eaab5536308ad3',
    comment: 'hello! i really like this program',
    date: new Date(),
    replays: [
      {
        _id: 'PC40100',
        comment_by_id: '6588917e47eaab5536308ad3',
        comment: 'hello! i really like this program',
        program_id: '658714dca67a415a29c58936',
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
  public getCommentsTemp() {
    return COMMENTS;
  }
  public getComments() {
    return this.comments$.asObservable();
  }
}
