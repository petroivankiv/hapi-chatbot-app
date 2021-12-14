import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeCardComponent } from './components/home-card/home-card.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeCardComponent
  ],
  imports: [
    BrowserModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
