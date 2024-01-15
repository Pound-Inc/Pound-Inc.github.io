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


  public getRelatedUser(userId: string): User | undefined {
    return this.users
      ? this.users.find((user) => user._id === userId)
      : undefined;
  }

  public cutDescription(desc: string) {
    const maxLength = 80;

    if (desc.length > maxLength) {
      const truncatedDesc = desc.substring(0, maxLength);
      const lastSpaceIndex = truncatedDesc.lastIndexOf(' ');

      if (lastSpaceIndex !== -1) {
        return {
          isLong: true,
          desc: truncatedDesc.substring(0, lastSpaceIndex),
        };
      }
    }

    return { isLong: false, desc: desc };
  }
}
