import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Observable } from 'rxjs';
import { AddSongDialogComponent } from '../add-song-dialog/add-song-dialog.component';
import { Song } from '../interfaces/song';
import { SongService } from '../services/song.service';
import { SnackbarService } from '../services/snackbar.service';


@Component({
  selector: 'app-setlist',
  templateUrl: './setlist.component.html',
  styleUrls: ['./setlist.component.scss']
})
export class SetlistComponent implements OnInit {

  @HostListener('window:beforeunload')
    onBeforeUnload() {
      return this.dirty === false;
    }


  songList: Song[] = [];

  setList: Song[] = [];

  saveMessage: string;

  totalSetTime = {
    minutes: 0,
    seconds: 0,
  }

  userId = 1

  dirty: boolean = false;

  constructor(
    public dialog: MatDialog,
    public songService: SongService,
    private snackbarService: SnackbarService) { }

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
    this.dirty = true;
  }

  openSongDialog() {
    const dialogRef = this.dialog.open(AddSongDialogComponent);
    dialogRef.afterClosed().subscribe((song) => {
      if (song) {
        this.songList.unshift(song);
        this.snackbarService.displaySnackBar("New Song Added!", "Dismiss", 2500)
        this.dirty = true;
      }
    });
  }

  add(song, index) {
    this.setList.unshift(song);
    this.songList.splice(index, 1);
    this.calculateSetTime();
    this.dirty = true;
  }

  deleteFromSet(song, index) {
    this.songList.unshift(song);
    this.setList.splice(index, 1);
    this.calculateSetTime();
    this.dirty = true;
  }

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
      this.snackbarService.displaySnackBar("Your lists have been saved!", "Dismiss", 2500);
      this.dirty = false;
    },
    (err) => {
      this.snackbarService.displaySnackBar(`There was an error.  Please try again`, "Dismiss", 2500);
      console.log('Error', err);
    });
  }

  deleteFromList(song, index) {
    this.songList.splice(index, 1);
    if (song.id != null) {
      this.songService.deleteSong(song.id)
        .subscribe(() => {
          this.snackbarService.displaySnackBar("Song Deleted!", "Dismiss", 2500)
        })
    } else {
      this.snackbarService.displaySnackBar("Song Deleted!", "Dismiss", 2500)
    }
  }

  calculateSetTime() {
    const setListSeconds = this.setList.reduce((total, song) => {
      return total + song.runSeconds + song.runMinutes*60
    }, 0);

    this.totalSetTime.seconds = setListSeconds % 60;
    this.totalSetTime.minutes = (setListSeconds - this.totalSetTime.seconds) / 60;
  }

  openPrintPage() {
    window.open('/print', '_blank');
  }
}
