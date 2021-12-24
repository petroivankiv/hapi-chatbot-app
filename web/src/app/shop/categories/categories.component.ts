import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../shop.type';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input() categories: Category[] | null = [];

  constructor() { }

  ngOnInit(): void {
  }

}
