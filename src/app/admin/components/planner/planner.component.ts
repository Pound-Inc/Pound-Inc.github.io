import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlannerDetailsModalComponent } from '../planner-details-modal/planner-details-modal.component';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent {
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  trainingCards: any[] = [
    {
      title: 'Chest & Shoulders',
      icon: 'account',
      position: [0, 0],
      isOpened: false,
      exercises: [
        {
          name: 'Squat',
          sets: 4,
          reps: 8,
          description:
            'Stand with your feet shoulder-width apart and squat down.',
        },
        {
          name: 'Deadlift',
          sets: 3,
          reps: 10,
          description:
            'Bend at the hips and knees to lower the barbell to the floor.',
        },
      ],
    },
    {
      title: 'Chest & Shoulders',
      icon: 'account',
      position: [0, 5],
      isOpened: false,
      exercises: [
        {
          name: 'Squat',
          sets: 4,
          reps: 8,
          description:
            'Stand with your feet shoulder-width apart and squat down.',
        },
        {
          name: 'Deadlift',
          sets: 3,
          reps: 10,
          description:
            'Bend at the hips and knees to lower the barbell to the floor.',
        },
      ],
    },
    {
      title: 'Chest & Shoulders',
      icon: 'account',
      position: [3, 3],
      isOpened: false,
      exercises: [
        {
          name: 'Bench Press',
          sets: 3,
          reps: 10,
          description:
            'Lie on a flat bench and lift the bar with a standard grip.',
        },
        {
          name: 'Shoulder Press',
          sets: 3,
          reps: 12,
          description: 'Sit or stand while pressing dumbbells overhead.',
        },
      ],
    },

    {
      title: 'Legs',
      icon: 'account',
      position: [1, 5],
      isOpened: false,
      exercises: [
        {
          name: 'Squat',
          sets: 4,
          reps: 8,
          description:
            'Stand with your feet shoulder-width apart and squat down.',
        },
        {
          name: 'Deadlift',
          sets: 3,
          reps: 10,
          description:
            'Bend at the hips and knees to lower the barbell to the floor.',
        },
      ],
    },
  ];

  numberOfRows: number = 3; // Set the desired number of rows

  rows: number[] = Array.from(
    { length: this.numberOfRows + 1 },
    (_, i) => i + 1
  );
  openedTrainings: { [key: string]: boolean } = {}; // Track opened trainings
  constructor(private modalService: NgbModal) {}

  openModal(row: number, position: number): void {
    this.trainingCards.sort((a, b) => a.position[0] - b.position[0]);

    const card = this.trainingCards.find(
      (tCard) => tCard.position[0] == row && tCard.position[1] == position
    );

    if (card) {
      const prevCardIndex = this.trainingCards.indexOf(card) - 1;

      if (prevCardIndex < 0 || this.trainingCards[prevCardIndex].isOpened) {
        card.isOpened = true;
        const modalRef = this.modalService.open(PlannerDetailsModalComponent, {
          size: 'md',
        });
  
        modalRef.componentInstance.exercises = card.exercises;
      } else {
        console.log('Cannot open this card yet.');
      }
    }
  }

  canBeOpened(trainingCard: any): boolean {
    const prevCardIndex = this.trainingCards.indexOf(trainingCard) - 1;
    return prevCardIndex < 0 || this.trainingCards[prevCardIndex].isOpened;
  }
  
}
