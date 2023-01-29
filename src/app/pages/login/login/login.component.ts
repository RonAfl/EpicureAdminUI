import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, UsersType, UserType } from 'src/app/services/users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  superAuthorized: boolean = false;
  userAuthorized: boolean = false;
  message: string = '';
  username: string = '';
  password: string = '';
  user_info: { user: UserType, accessToken: string } = {
    user: {
      _id: '',
      username: '',
      password: '',
      isSuper: false,
      isDeleted: false
    }, accessToken: ''
  };

  constructor(private route: Router, private usersService: UsersService) { }

  ngOnInit() {
    if (localStorage.getItem('admin') || localStorage.getItem('user')) {
      this.route.navigateByUrl("home-admin");
    }
  }

  async getUser(): Promise<void> {
    return new Promise((resolve) => {
      this.usersService.getUsers(this.username, this.password).subscribe((result: { user: UserType, accessToken: string }) => {
        console.log(result);

        if (result) {
          this.user_info = { user: result.user, accessToken: result.accessToken }
          resolve();
        }
      })
    });
  }

  async onSubmit() {
    await this.getUser();
    if (this.user_info.user.isSuper || this.superAuthorized) {
      localStorage.setItem("admin", this.user_info.accessToken);
      localStorage.setItem("isSuper", '1');
      this.superAuthorized = true;
      this.message = '';
      this.route.navigateByUrl("home-admin");
    }
    else if (!this.user_info.user.isSuper || this.userAuthorized) {
      localStorage.setItem("user", this.user_info.accessToken);
      localStorage.setItem("isSuper", '0');
      this.message = '';
      this.userAuthorized = true;
      this.route.navigateByUrl("home-admin");
    }
    else {
      this.message = 'Unauthorized Login - Not Admin'
    }
  }
}
