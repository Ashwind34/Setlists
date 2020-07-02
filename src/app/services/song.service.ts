import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Song } from '../interfaces/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:3000/songs"

  getSongs(id: number) {
    const filter = `filter=${JSON.stringify({ where: { userId: id } })}`
    return this.http.get(`${this.url}?${filter}`);
  }

  addSong(song) {
    return this.http.post(this.url, song);
  }

  updateSong(song, id) {
    return this.http.patch(`${this.url}/${id}`, song);
  }

  updateAllSongs(songs: Song[]) {
    return this.http.patch(this.url, songs);
  }

  deleteSong(id) {
    return this.http.delete(`${this.url}/${id}`)
  }

}
