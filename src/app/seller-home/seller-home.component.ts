import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | Product[];
  deleteMessage: string | undefined;
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.list();
  }
  deleteProduct(id: string) {
    this.product.deleteItem(id).subscribe((result) => {
      if (result) {
        this.deleteMessage = "Product deleted sucessfully";
        this.list();
      }
      setTimeout(() => {
        this.deleteMessage = undefined;
      }, 5000);
    })
  }
  list() {
    this.product.getProductList().subscribe((result) => {
      this.productList = result;
    })
  }

}
