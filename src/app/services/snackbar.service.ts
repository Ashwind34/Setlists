import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  displaySnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, { duration });
  }


}
