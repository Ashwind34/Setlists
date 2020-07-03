import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetlistComponent } from './setlist/setlist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrintSetlistComponent } from './print-setlist/print-setlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'setlist', component: SetlistComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'print', component: PrintSetlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
