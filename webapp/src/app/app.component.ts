import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from "./services/auth.service";
import {User} from "./models/User";

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  currentUser: User | undefined;

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
