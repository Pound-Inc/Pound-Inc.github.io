import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/admin/services/user.service';
import { ProgramComment } from 'src/app/model/comment.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-program-comments',
  templateUrl: './program-comments.component.html',
  styleUrls: ['./program-comments.component.scss'],
})
export class ProgramCommentsComponent implements OnInit {
  @Input() comments: ProgramComment[];
  users: User[] = [];
  constructor(private userService: UserService) {}
  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers();
  }

  getRelatedUser(userId: any) {
    return this.users.find((u) => u._id === userId);
  }
  public getStarRange(): number[] {
    return Array.from({ length: 5 }, (_, index) => index);
  }
}
