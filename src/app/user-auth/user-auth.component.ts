import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Login, SignUp } from '../data-type';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
})
export class UserAuthComponent implements OnInit {
  signupMessage = '';
  loginErrorMessage = '';
  showLogin: boolean = true;
  authError = '';

  constructor(private user: UserService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }
  userSignUp(formData: SignUp): void {
    this.user.userSignUp(formData);
    this.signupMessage = 'Signed up successfully!';
    setTimeout(() => {
      this.signupMessage = '';
    }, 5000);
  }
  userLogin(formData: Login): void {
    this.user.userLogin(formData);
    this.user.invalidUserAuth.subscribe((result) => {
      console.log(result);
      if (result) {
        this.authError = 'Please enter valid user details';
      }
    });
  }
  openUserLogin() {
    this.showLogin = true;
  }
  openUserSignup() {
    this.showLogin = false;
  }
}
