import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProgramComment } from 'src/app/model/comment.model';

const COMMENTS: ProgramComment[] = [];

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
