import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetlistComponent } from './setlist/setlist.component';

const routes: Routes = [
  {path: '', redirectTo: 'setlist', pathMatch: 'full'},
  {path: 'setlist', component: SetlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
