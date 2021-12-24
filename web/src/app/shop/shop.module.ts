import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { SearchComponent } from './search/search.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';


@NgModule({
  declarations: [
    ShopComponent,
    SearchComponent,
    ProductsComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
