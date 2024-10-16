import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  quantity: number = 1;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((result) => {
      console.log(result);
      this.productData = result;
    })
  }
  handleQuantity(value: string): void {
    if (this.quantity < 20 && value == 'increase') {
      this.quantity += 1;
    }
    else if (this.quantity > 1 && value == 'decrease') {
      this.quantity -= 1;
    }
  }
}
