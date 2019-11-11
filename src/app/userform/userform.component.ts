import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss']
})
export class UserformComponent implements OnInit {

  @Input() login: boolean;

  userForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group(
      {
        id: [null],
        name: [null],
        email: [null, Validators.required],
        password: [null, Validators.required]
      },
    );
  }

  showData() {
    console.log(this.userForm)
  }

  toggleLogin() {
    this.login = !this.login;
    console.log(this.login)
  }

}
