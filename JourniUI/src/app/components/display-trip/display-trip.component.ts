import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-display-trip',
  templateUrl: './display-trip.component.html',
  styleUrls: ['./display-trip.component.scss']
})
export class DisplayTripComponent implements OnInit {

  days = []

  dayList = []

  constructor() { 
    // this.days = [
    //   {
    //     name: "day1",
    //     PlaceId: [
    //     'Get to work',
    //     'Pick up groceries',
    //     'Go home',
    //     'Fall asleep'
    //     ]
    //   },
    //   {
    //     name: "day2",
    //     places: [
    //     'Get up',
    //     'Brush teeth',
    //     'Take a shower',
    //     'Check e-mail',
    //     'Walk dog'
    //     ]
    //   }
    // ];

    this.days = [
      { 
        Day: [
          {
            Name: "place 1"
          },
          {
            Name: "place 2"
          },
          {
            Name: "place 3"
          },
        ]
      },
      { 
        Day: [
          {
            Name: "place 4"
          },
          {
            Name: "place 5"
          },
          {
            Name: "place 6"
          },
        ]
      }
     
    ];
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    //update db here - no need for save?
  }

}
