import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {UserService} from "../services/api/user.service";
import {User} from "../models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm = this.formBuilder.group({
    username: '',
    password: ''
  })

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.userService.createUser(this.userForm.value as User).subscribe(data => {});
    this.router.navigate(['']);
  }
}
