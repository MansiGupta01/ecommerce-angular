import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit {
  productMessage: string | undefined;
  constructor(private product: ProductService) { }

  ngOnInit(): void {
  }
  addNewProduct(data: Product) {
    console.log(data);
    this.product.addProductDetail(data).subscribe((result) => {
      console.log(data);
      if (result) {
        this.productMessage = "Product added successfully!"
      }
      setTimeout(() => this.productMessage = undefined, 5000);
    });
  }

}
