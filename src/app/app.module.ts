import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetlistComponent } from './setlist/setlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddSongDialogComponent } from './add-song-dialog/add-song-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatRadioModule,
} from '@angular/material';
import { UserformComponent } from './userform/userform.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PrintSetlistComponent } from './print-setlist/print-setlist.component';



@NgModule({
  declarations: [
    AppComponent,
    SetlistComponent,
    AddSongDialogComponent,
    UserformComponent,
    RegisterComponent,
    LoginComponent,
    PrintSetlistComponent,
  ],
  entryComponents: [
    AddSongDialogComponent,
    UserformComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatRadioModule,
    MatSnackBarModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
