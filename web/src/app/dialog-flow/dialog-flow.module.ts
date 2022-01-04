import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { DialogFlowComponent } from './dialog-flow.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './message/message.component';
import { MessageIconComponent } from './message-icon/message-icon.component';
import { MessageHeaderComponent } from './message-header/message-header.component';
import { MessageContentComponent } from './message-content/message-content.component';

@NgModule({
  declarations: [
    DialogFlowComponent,
    ChatComponent,
    MessageComponent,
    MessageIconComponent,
    MessageHeaderComponent,
    MessageContentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [
    DialogFlowComponent
  ]
})
export class DialogFlowModule {
}
