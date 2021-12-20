import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavButtonComponent } from './nav-button/nav-button.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    NavButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    NavButtonComponent
  ]
})
export class SharedModule { }
