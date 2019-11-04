import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

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

  deleteSong(id) {
    return this.http.delete(`${this.url}/${id}`)
  }

}
