import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';
import { UserService } from '../services/user.service';
import { Song } from '../interfaces/song';

@Component({
  selector: 'app-print-setlist',
  templateUrl: './print-setlist.component.html',
  styleUrls: ['./print-setlist.component.scss']
})
export class PrintSetlistComponent implements OnInit {

  setList: Song[];

  bandName: string = "Band Name Here"

  constructor(private songService: SongService, private userService: UserService) { }

  ngOnInit() {
    this.songService.getSongs(this.userService.currentUserId).subscribe(songs => {
      this.setList = songs.filter(song => song.onSetlist === 1).sort((a, b) => {
        return a.setOrder - b.setOrder;
      });
    })
  }

  print() {
    window.print();
  }

}
