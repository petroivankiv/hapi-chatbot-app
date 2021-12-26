import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopService } from './shop.service';
import { Product } from './shop.type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products$: Observable<Product[]>;
  filters: Record<string, string>;

  constructor(private service: ShopService, private ar: ActivatedRoute) {
    const filters: Record<string, string> = ar.snapshot.paramMap.keys.reduce((acc, key) => ({ ...acc, [key]: ar.snapshot.paramMap.get(key) }), {});
    this.filters = filters;
    this.products$ = service.getProducts(filters);
  }

  get filterSummary() {
    return this.filters ? Object.values(this.filters) : [];
  }

  ngOnInit(): void {
  }

}
