import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Category } from './shop.type';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/mocks/products.json');
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('assets/mocks/categories.json');
  }
}
