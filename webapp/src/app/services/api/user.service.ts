import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = 'http://0.0.0.0:8000/auth/register/'

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.usersUrl);
  }

  createUser(user: User) {
    return this.http.post(this.usersUrl, user);
  }
}
