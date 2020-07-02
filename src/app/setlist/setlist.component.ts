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

  songList: Song[] = [];

  setList: Song[] = [];

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
    console.dir(this.setList)
    console.log('Songlist')
    console.dir(this.songList)
  }

  ngOnInit() {
    this.loadSongs(this.userId);
  }

  loadSongs(id) {
    this.songService.getSongs(id)
      .subscribe((response: Song[]) => {
        response.forEach((item) => {
          item.onSetlist === 1 ? this.setList.push(item) : this.songList.push(item);
          this.setList.sort(this.sortSongs);
          this.songList.sort(this.sortSongs);
          this.calculateSetTime();
        })
      })
  }

  sortSongs(a, b) {
    if (a.onSetlist) {
      return a.setOrder - b.setOrder;
    } else {
      return a.listOrder - b.listOrder;
    }
  }

  // this does not work - only updates current song, not other songs.  need linked list

  // updateSongPosition(song: Song, index: number, containerId?: string) {
  //   if (containerId === 'setList') {
  //     song.onSetlist = 1;
  //     song.setOrder = index;
  //     song.listOrder = 0;
  //   } else {
  //     song.onSetlist = 0;
  //     song.setOrder = 0;
  //     song.listOrder = index;
  //   }
  //   this.dirty = true;
  // }

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
    // this.updateSongPosition(song, index, id);
    this.calculateSetTime();
  }

  openSongDialog() {
    const dialogRef = this.dialog.open(AddSongDialogComponent);
    dialogRef.afterClosed().subscribe((song) => {
      if (song) {
        this.songList.unshift(song);
        this.saveMessage = 'New Song Added!';
      }
    });
  }

  add(song, index) {
    this.setList.unshift(song);
    this.songList.splice(index, 1);
    // this.updateSongPosition(song, index, 'setList');
    this.calculateSetTime();
  }

  deleteFromSet(song, index) {
    this.songList.unshift(song);
    this.setList.splice(index, 1);
    // this.updateSongPosition(song, index, 'songList');
    this.calculateSetTime();
  }

  //NEED TO ADD LOGIC TO HANDLE CHANGE IN ORDER, OR SONG EDIT

  save() {
    this.saveMessage = null;
    const saveRequests: Observable<any>[] = [];
    this.setList.forEach((song: Song, index) => {
      song.setOrder = index;
      song.listOrder = 0;
      song.onSetlist = 1;
      if (song.id == null) {
        const { id, ...songData } = song;
        songData.userId = this.userId;
        saveRequests.push(this.songService.addSong(songData));
      } else {
        saveRequests.push(this.songService.updateSong(song, song.id));
      }
    });
    this.songList.forEach((song: Song, index) => {
      song.setOrder = 0
      song.listOrder = index;
      song.onSetlist = 0;
      if (song.id  == null) {
        const { id, ...songData } = song;
        songData.userId = this.userId;
        saveRequests.push(this.songService.addSong(songData))
      } else {
        saveRequests.push(this.songService.updateSong(song, song.id));
      }
    });
    forkJoin(saveRequests).subscribe(() => {
      this.saveMessage = "Your lists have been saved!"
    })
  }



  deleteFromList(song, index) {
    this.saveMessage = null;
    this.songList.splice(index, 1);
    if (song.id != null) {
      this.songService.deleteSong(song.id)
        .subscribe(() => {
          this.saveMessage = "Song Deleted!"
        })
    } else {
      this.saveMessage = "Song Deleted!"
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
