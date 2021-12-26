import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { filter, Observable, of } from 'rxjs';
import { ShopService } from './shop.service';
import { Product } from './shop.type';

@Injectable({
  providedIn: 'root'
})
export class ShopResolver implements Resolve<Product[]> {
  constructor(private service: ShopService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    const filters: Record<string, string> = route.paramMap.keys.reduce((acc, key) => ({ ...acc, [key]: route.paramMap.get(key) }), {});

    return this.service.getProducts().pipe(filter(product => {
      const filterKeys: string[] = Object.keys(filters);

      if (!filterKeys.length) {
        return true;
      }

      return filterKeys.every((key: string) => filters[key] === (product as any)[key]);
    }));
  }
}
