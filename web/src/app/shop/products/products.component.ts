import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../shop.type';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() products: Product[] | null = [];

  constructor() { }

  ngOnInit(): void {
  }

}
