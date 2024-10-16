import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Login, SignUp } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss'],
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService) {}
  showLogin = false;
  loginErrorMessage = '';
  signupMessage = '';
  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  SignUp(formData: SignUp): void {
    this.seller.sellerSignUp(formData);
  }
  Login(formData: Login): void {
    this.seller.sellerLogin(formData);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.loginErrorMessage = 'Email or Password is Incorrect';
      }
    });
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
}
