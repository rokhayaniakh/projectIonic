import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUserData = {};
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.auth.login(this.loginUserData)
      .subscribe(
        res => {
          this.router.navigateByUrl('home');
          console.log(res);
          let jwt = res.body;
          this.auth.saveToken(jwt);
      },
      err => {
        console.log(err);

      }
      );
  }
}
