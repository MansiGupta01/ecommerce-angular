import { Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  invalidUserAuth = new BehaviorSubject<boolean>(false);
  constructor(private router: Router, private http: HttpClient) {}
  userSignUp(data: SignUp) {
    this.http
      .post('http://localhost:3000/user', data, { observe: 'response' })
      .subscribe((result) => {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);
      });
  }
  userLogin(data: Login) {
    this.http
      .get(
        `http://localhost:3000/user?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
          this.invalidUserAuth.next(false);
        } else {
          this.invalidUserAuth.next(true);
        }
      });
  }
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
