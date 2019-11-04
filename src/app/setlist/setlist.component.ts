import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddSongDialogComponent } from '../add-song-dialog/add-song-dialog.component';
import { SongService } from '../services/song.service';
import { Song } from '../interfaces/song';


@Component({
  selector: 'app-setlist',
  templateUrl: './setlist.component.html',
  styleUrls: ['./setlist.component.scss']
})
export class SetlistComponent implements OnInit {

  songList = [];

  setList = [];

  totalSetTime = {
    minutes: 0,
    seconds: 0,
  }

  constructor(public dialog: MatDialog, public songService: SongService) { }

  ngOnInit() {
    this.loadSongs(1);
  }

  loadSongs(id) {
    this.songService.getSongs(id)
      .subscribe((response: Song[]) => {
        response.forEach((item) => {
          item.onSetlist === 1 ? this.setList.push(item) : this.songList.push(item);
          this.calculateSetTime();
        })
      })
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
}
