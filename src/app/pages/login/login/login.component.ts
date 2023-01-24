import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, UsersType } from 'src/app/services/users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isAuthorized: boolean = false;
  message: string = '';
  username: string = '';
  password: string = '';
  users: { username: string, password: string }[] = [];

  constructor(private route: Router, private usersService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe((result) => {
      this.users = result.map((user) => {
        return {
          username: user.username,
          password: user.password,
        }
      })
    });
  }

  checkAuth() {
    for (let user of this.users) {
      if (this.username === user.username && this.password === user.password) {
        return true;
      }
    }
    return false;
  }
  onSubmit() {
    if (this.checkAuth()) {
      localStorage.setItem("log-in", "admin")
      this.isAuthorized = true;
      this.message = '';
      this.route.navigateByUrl("home-admin");
    }
    else {
      this.isAuthorized = false;
      this.message = 'Unauthorized Login'
      
    }
  }
}
