import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-setlist',
  templateUrl: './setlist.component.html',
  styleUrls: ['./setlist.component.scss']
})
export class SetlistComponent implements OnInit {

  songList: object[] = [
    {
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Fear Incoculum",
      time: "10:20"
    },
    {
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Pneuma",
      time: "11:53"
    },
    {
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Invincible",
      time: "12:45"
    },
    {
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Descending",
      time: "13:38"
    },
    {
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Culling Voices",
      time: "10:05"
    },
    {
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Chocolate Chip Trip",
      time: "4:48"
    },
  ];

  setList: object[] = [
    {
      artist: "Tool",
      album: "Fear Inoculum",
      song: "7empest",
      time: "15:44"
    }
  ];

  constructor() { }

  ngOnInit() {
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
  }

  showLists() {
    console.log("Song List")
    console.log(this.songList);
    console.log("Set List")
    console.log(this.setList)
  }
}
