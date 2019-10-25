import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetlistComponent } from './setlist/setlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DragDropModule
} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    SetlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
