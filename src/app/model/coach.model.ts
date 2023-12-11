import { Certifications } from './certifications.model';
import { ClientStories } from './client-stories.model';
import { TrainingProgram } from './training-program.model';

export class Coach {
  constructor(
    public coachId: string,
    public name: string,
    public bio: string,
    public certifications: Certifications[],
    public imageUrl: string,
    public contactEmail: string,
    public socialLinks: { [key: string]: string } = {},
    public trainingPrograms: TrainingProgram[] = [],
    public languages: string[],
    public availability: string,
    public clientsServed: number,
    public clientStories: ClientStories[],
    public birthday: string,
    public location: string,
    public isVerified: boolean
  ) {}
}
