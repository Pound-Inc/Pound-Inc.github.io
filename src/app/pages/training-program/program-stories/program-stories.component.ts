import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/admin/services/user.service';
import { ProgramStory } from 'src/app/model/story.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-program-stories',
  templateUrl: './program-stories.component.html',
  styleUrls: ['./program-stories.component.scss'],
})
export class ProgramStoriesComponent implements OnInit {
  @Input() stories: ProgramStory[];
  users: User[] = [];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getUsers().then((response: any) => {
      this.users = response['data'];
    });
  }

  getRelatedUser(userId: any) {
    return this.users.find((u) => u._id === userId);
  }
}
