import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavButtonComponent } from './nav-button/nav-button.component';
import { MatButtonModule } from '@angular/material/button';
import { NoDataComponent } from './no-data/no-data.component';

@NgModule({
  declarations: [
    NavButtonComponent,
    NoDataComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    NavButtonComponent,
    NoDataComponent
  ]
})
export class SharedModule { }
