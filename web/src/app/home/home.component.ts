import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cards = [
    { title: 'Books',  product: 'book', icon: 'library_books' },
    { title: 'Toys',  product: 'toys', icon: 'toys' },
    { title: 'Shoes',  product: 'shoes', icon: 'ice_skating' },
    { title: 'Laptops',  product: 'laptops', icon: 'laptop' },
    { title: 'Smartphones',  product: 'smartphones', icon: 'smartphone' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
