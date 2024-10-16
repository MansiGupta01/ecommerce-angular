import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
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

  constructor(private router: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.setUserType();
    this.router.events.subscribe(() => {
      this.setUserType();
    });
  }

  private setUserType() {
    const sellerDetail = localStorage.getItem('seller');
    const userDetail = localStorage.getItem('user');

    if (sellerDetail) {
      const sellerData = sellerDetail && JSON.parse(sellerDetail)[0];
      this.sellerName = sellerData.username;
      this.userType = 'seller';
    } else if (userDetail) {
      const userData = userDetail && JSON.parse(userDetail)[0];
      this.userName = userData.username;
      this.userType = 'user';
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
