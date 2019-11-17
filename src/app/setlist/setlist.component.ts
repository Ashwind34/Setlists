import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddSongDialogComponent } from '../add-song-dialog/add-song-dialog.component';
import { SongService } from '../services/song.service';
import { Song } from '../interfaces/song';
import { Observable, forkJoin } from 'rxjs';


@Component({
  selector: 'app-setlist',
  templateUrl: './setlist.component.html',
  styleUrls: ['./setlist.component.scss']
})
export class SetlistComponent implements OnInit {

  songList = [];

  setList = [];

  saveMessage: string;

  totalSetTime = {
    minutes: 0,
    seconds: 0,
  }

  userId = 1

  dirty: boolean = false;

  constructor(public dialog: MatDialog, public songService: SongService) { }

  showLists() {
    console.log('Setlist')
    console.log(this.setList)
    console.log('Songlist')
    console.log(this.songList)
  }

  ngOnInit() {
    this.loadSongs(this.userId);
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

  // this does not work - only updates current song, not other songs.  need linked list

  updateSongInfo(song: Song, index: number, containerId?: string) {
    if (containerId === 'setList') {
      song.onSetlist = 1;
      song.setOrder = index;
      song.listOrder = 0;
    } else {
      song.onSetlist = 0;
      song.setOrder = 0;
      song.listOrder = index;
    }
    this.dirty = true;
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
    const id = event.container.id;
    const index = event.currentIndex;
    const song = event.container.data[index];
    // this.updateSongInfo(song, index, id)
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
    this.setList.unshift(song);
    this.songList.splice(index, 1);
    this.calculateSetTime();
  }

  deleteFromSet(song, index) {
    this.songList.unshift(song);
    this.setList.splice(index, 1);
    this.calculateSetTime();
  }

  //NEED TO ADD LOGIC TO HANDLE CHANGE IN ORDER, OR SONG EDIT

  save() {
    const saveRequests: Observable<any>[] = [];
    this.setList.forEach((song: Song, index) => {
      if (song.id == null) {
        const { id, ...songData } = song;
        songData.setOrder = index;
        songData.listOrder = 0;
        songData.onSetlist = 1;
        songData.userId = this.userId;
        saveRequests.push(this.songService.addSong(songData));
      }
    });
    this.songList.forEach((song: Song, index) => {
      if (song.id  == null) {
        const { id, ...songData } = song;
        songData.setOrder = 0
        songData.listOrder = index;
        songData.onSetlist = 0;
        songData.userId = this.userId;
        saveRequests.push(this.songService.addSong(songData))
      }
    });
    forkJoin(saveRequests).subscribe(() => {
      this.saveMessage = "Your lists have been saved!"
    })
  }

  deleteFromList(song, index) {
    this.songList.splice(index, 1);
    if (song.id != null) {
      this.songService.deleteSong(song.id)
        .subscribe(() => {
          this.saveMessage = "Song deleted!"
        })
    }
  }

  calculateSetTime() {
    const setListSeconds = this.setList.reduce((total, song) => {
      return total + song.runSeconds + song.runMinutes*60
    }, 0);

    this.totalSetTime.seconds = setListSeconds % 60;
    this.totalSetTime.minutes = (setListSeconds - this.totalSetTime.seconds) / 60;
  }
}
