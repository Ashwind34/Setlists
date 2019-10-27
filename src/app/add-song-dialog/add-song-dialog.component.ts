import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-song-dialog',
  templateUrl: './add-song-dialog.component.html',
  styleUrls: ['./add-song-dialog.component.scss']
})
export class AddSongDialogComponent implements OnInit {

  songForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddSongDialogComponent>,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.buildForm();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  showForm() {
    console.log(this.songForm);
  }

  addSong() {
    this.dialogRef.close(this.songForm.value);
  }

  buildForm() {
    this.songForm = this.fb.group({
      id: [null],
      artist: [null],
      album: [null],
      song: [null],
      runMinutes: [null],
      runSeconds: [null],
    });
  }

}
