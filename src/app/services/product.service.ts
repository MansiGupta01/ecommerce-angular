import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartItemData = new BehaviorSubject<Product[] | []>([]);
  constructor(private http: HttpClient) {}
  addProductDetail(data: Product) {
    return this.http.post('http://localhost:3000/products', data);
  }

  getProductList() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }
  deleteItem(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product: Product) {
    return this.http.put<Product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
  popularProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=3');
  }
  searchProduct(query: string) {
    return this.http.get<Product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }
  localCartProduct(data: Product) {
    let cartData: Product[] = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localCart);
      let existingProduct = cartData.findIndex((item) => item.id === data.id);
      if (existingProduct > -1) {
        cartData[existingProduct].quantity += data.quantity;
      } else {
        cartData.push(data);
      }
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartItemData.next(cartData);
  }
}
