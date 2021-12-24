import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopService } from './shop.service';
import { Category, Product } from './shop.type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products$: Observable<Product[]>;
  categories$: Observable<Category[]>

  constructor(private service: ShopService) {
    this.products$ = service.getProducts();
    this.categories$ = service.getCategories();
  }

  ngOnInit(): void {
  }

}
