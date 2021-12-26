import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '../shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { SearchComponent } from './search/search.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { RatingComponent } from './rating/rating.component';
import { FilterSummaryComponent } from './filter-summary/filter-summary.component';


@NgModule({
  declarations: [
    ShopComponent,
    SearchComponent,
    ProductsComponent,
    CategoriesComponent,
    ProductCardComponent,
    RatingComponent,
    FilterSummaryComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatChipsModule,
    SharedModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
