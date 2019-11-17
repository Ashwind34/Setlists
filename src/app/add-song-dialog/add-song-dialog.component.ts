import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-song-dialog',
  templateUrl: './add-song-dialog.component.html',
  styleUrls: ['./add-song-dialog.component.scss']
})
export class AddSongDialogComponent implements OnInit {

  songForm: FormGroup;

  formType: string = 'song';

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

  addSong() {
    if (this.formType === 'break') {
      this.songForm.controls.artist.setValue('Break')
      this.songForm.controls.album.setValue('')
    }
    console.log(this.songForm.value)
    this.dialogRef.close(this.songForm.value);
  }

  buildForm() {
    this.songForm = this.fb.group({
      id: [null],
      artist: [null],
      album: [null],
      name: [null, Validators.required],
      runMinutes: [null, Validators.required],
      runSeconds: [null, Validators.required],
      onSetlist: [0],
      setOrder: [0],
      listOrder: [0],
    });
  }

  onRadioChange(event) {
    this.formType = event.value
  }

}
