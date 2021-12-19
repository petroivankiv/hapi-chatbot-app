import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { DialogFlowComponent } from './dialog-flow.component';



@NgModule({
  declarations: [
    DialogFlowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
})
export class DialogFlowModule { }
