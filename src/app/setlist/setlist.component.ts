import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-setlist',
  templateUrl: './setlist.component.html',
  styleUrls: ['./setlist.component.scss']
})
export class SetlistComponent implements OnInit {

  //NEED TO CREATE INTERFACE FOR SONG DATA

  songList: object[] = [
    {
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Fear Incoculum",
      runMinutes: 10,
      runSeconds: 20
    },
    {
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Pneuma",
      runMinutes: 11,
      runSeconds: 53
    },
    {
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Invincible",
      runMinutes: 12,
      runSeconds: 45
    },
    {
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Descending",
      runMinutes: 13,
      runSeconds: 38
    },
    {
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Culling Voices",
      runMinutes: 10,
      runSeconds: 5
    },
    {
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Chocolate Chip Trip",
      runMinutes: 4,
      runSeconds: 48
    },
  ];

  setList: object[] = [
    {
      artist: "Tool",
      album: "Fear Inoculum",
      song: "7empest",
      runMinutes: 15,
      runSeconds: 44
    }
  ];

  totalSetTime = {
    minutes: 0,
    seconds: 0,
  }

  constructor() { }

  ngOnInit() {
    this.calculateSetTime();
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
    this.calculateSetTime();
  }

  add() {
    console.log("Add");
  }

  delete() {
    console.log("Delete");
  }

  calculateSetTime() {
    const setListSeconds = this.setList.reduce((total, song) => {
      return total + song.runSeconds + song.runMinutes*60
    }, 0);

    this.totalSetTime.seconds = setListSeconds % 60;
    this.totalSetTime.minutes = (setListSeconds - this.totalSetTime.seconds) / 60;
  }

  showLists() {
    console.log("Song List")
    console.log(this.songList);
    console.log("Set List")
    console.log(this.setList)
  }
}
