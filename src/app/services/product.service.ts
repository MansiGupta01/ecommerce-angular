import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  addProductDetail(data: Product) {
    return this.http.post("http://localhost:3000/products", data);
  }

  getProductList() {
    return this.http.get<Product[]>("http://localhost:3000/products");
  }
  deleteItem(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product: Product) {
    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`, product);
  }
  popularProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=3');
  }
  searchProduct(query: string) {
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${query}`);
  }
}
