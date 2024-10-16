import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | Product;
  productMessage: undefined | string;
  constructor(private product: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result;
      console.log(this.productData);
    });
  }
  submitProductUpdated(data: Product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = "Product Details Updated";
      }
    })
    setTimeout(() => {
      this.productMessage = undefined;
      this.router.navigate(['seller-home']);
    }, 5000)


  }

}
