import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DialogFlowModule } from '../dialog-flow/dialog-flow.module';

import { MatIconModule } from '@angular/material/icon';

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
    HomeRoutingModule,
    DialogFlowModule,
    MatIconModule
  ]
})
export class HomeModule { }
