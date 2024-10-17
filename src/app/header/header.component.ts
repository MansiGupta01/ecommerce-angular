import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { SellerService } from '../services/seller.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | Product[];
  searchInput: undefined | Product[];
  cartItem = 0;
  constructor(
    private router: Router,
    private product: ProductService,
    private seller: SellerService
  ) {}

  ngOnInit(): void {
    this.setUserType();
    this.router.events.subscribe(() => {
      this.setUserType();
    });

    this.seller.isSellerLoggedIn.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.setUserType();
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItem = JSON.parse(cartData).length;
    }
    this.product.cartItemData.subscribe((items) => {
      this.cartItem = items.length;
    });
  }

  private setUserType() {
    const sellerDetail = localStorage.getItem('seller');
    const userDetail = localStorage.getItem('user');

    if (sellerDetail) {
      this.userType = 'seller';
      const sellerData = sellerDetail && JSON.parse(sellerDetail);
      this.sellerName = sellerData.username;
    } else if (userDetail) {
      this.userType = 'user';
      const userData = userDetail && JSON.parse(userDetail);
      this.userName = userData.username;

      console.log(this.userName);
    } else {
      this.userType = 'default';
    }
  }

  sellerLogOut() {
    localStorage.removeItem('seller');
    this.setUserType();
    this.router.navigate(['/']);
  }

  userLogOut() {
    localStorage.removeItem('user');
    this.setUserType();
    this.router.navigate(['/user-auth']);
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLTextAreaElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }
  redirectToProduct(id: string) {
    this.router.navigate([`/details/${id}`]);
  }
  hideSearchResult() {
    this.searchResult = undefined;
  }
  submitSearch(value: string) {
    this.router.navigate([`search/${value}`]);
  }
}
