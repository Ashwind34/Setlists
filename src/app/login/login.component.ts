import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserformComponent } from '../userform/userform.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  goToSetlist() {
    this.router.navigate(['/setlist']);
  }

}
