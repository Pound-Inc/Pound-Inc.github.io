import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/admin/services/comment.service';
import { ProgramService } from 'src/app/admin/services/program.service';
import { UserService } from 'src/app/admin/services/user.service';
import { ProgramComment } from 'src/app/model/comment.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { User } from 'src/app/model/user.model';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent implements OnInit {
  public comments: ProgramComment[];
  public programs: TrainingProgram[];
  public users: User[];
  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private programService: ProgramService
  ) {
    register();
  }
  async ngOnInit(): Promise<void> {
    this.programs = await this.programService.getPrograms();
    this.comments = await this.commentService.getComments();
    this.users = await this.userService.getUsers();
    this.comments.filter((c) => c.rating === 5);
  }

  getRelatedUser(userId: string) {
    return this.users.find((u) => u._id === userId);
  }
  getRelatedProgram(programId: string) {
    return this.programs.find((p) => p._id === programId);
  }

  getSlidesPerView(): string {
    if (window.innerWidth >= 992) {
      return '3';
    } else if (window.innerWidth >= 576) {
      return '2';
    } else {
      return '1';
    }
  }

  public getStarRange(): number[] {
    return Array.from({ length: 5 }, (_, index) => index);
  }
}
