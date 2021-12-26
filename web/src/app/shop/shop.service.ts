import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product, Category } from './shop.type';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  getProducts(filters: Record<string, string> = {}): Observable<Product[]> {
    return this.http.get<Product[]>('assets/mocks/products.json').pipe(map(products => {
      return products.filter(product => {
        const filterKeys = Object.keys(filters);

        if (!filterKeys.length) {
          return true;
        }

        return filterKeys.every(key => filters[key] === product[key as keyof Product]);
      });
    }));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('assets/mocks/categories.json');
  }
}
