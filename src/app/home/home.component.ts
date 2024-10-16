import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | Product[]
  allProducts: undefined | Product[]
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((result) => {
      this.popularProducts = result;
      console.log(this.popularProducts);
    });
    this.product.getProductList().subscribe((result) => {
      this.allProducts = result;
      console.log(this.allProducts);
    });
  }


}
