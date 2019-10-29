import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddSongDialogComponent } from '../add-song-dialog/add-song-dialog.component';

@Component({
  selector: 'app-setlist',
  templateUrl: './setlist.component.html',
  styleUrls: ['./setlist.component.scss']
})
export class SetlistComponent implements OnInit {

  //NEED TO CREATE INTERFACE FOR SONG DATA

  songList = [
    {
      id: 1,
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Fear Incoculum",
      runMinutes: 10,
      runSeconds: 20
    },
    {
      id: 2,
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Pneuma",
      runMinutes: 11,
      runSeconds: 53
    },
    {
      id: 3,
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Invincible",
      runMinutes: 12,
      runSeconds: 45
    },
    {
      id: 4,
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Descending",
      runMinutes: 13,
      runSeconds: 38
    },
    {
      id: 5,
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Culling Voices",
      runMinutes: 10,
      runSeconds: 5
    },
    {
      id: 6,
      artist: "Tool",
      album: "Fear Inoculum",
      song: "Chocolate Chip Trip",
      runMinutes: 4,
      runSeconds: 48
    },
  ];

  setList = [
    {
      id: 7,
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

  constructor(public dialog: MatDialog) { }

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

  openSongDialog() {
    const dialogRef = this.dialog.open(AddSongDialogComponent);
    dialogRef.afterClosed().subscribe((song) => {
      if (song) {
        this.songList.push(song);
      }
      console.log('The dialog was closed');
    });
  }

  add(song, index) {
    this.setList.push(song);
    this.songList.splice(index, 1);
    this.calculateSetTime();
  }

  deleteFromSet(song, index) {
    this.songList.push(song);
    this.setList.splice(index, 1);
    this.calculateSetTime();
  }

  deleteFromList() {
    console.log("delete from list");
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
