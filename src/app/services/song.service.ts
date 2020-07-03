import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Song } from '../interfaces/song';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:3000/songs"

  getSongs(id: number): Observable<Song[]> {
    const filter = `filter=${JSON.stringify({ where: { userId: id } })}`
    return this.http.get<Song[]>(`${this.url}?${filter}`);
  }

  addSong(song): Observable<any> {
    return this.http.post(this.url, song);
  }

  updateSong(song, id): Observable<any> {
    return this.http.patch(`${this.url}/${id}`, song);
  }

  updateAllSongs(songs: Song[]): Observable<any> {
    return this.http.patch(this.url, songs);
  }

  deleteSong(id): Observable<any> {
    return this.http.delete(`${this.url}/${id}`)
  }

}
