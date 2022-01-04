import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../types/message.interface';

@Component({
  selector: 'app-message-header',
  templateUrl: './message-header.component.html',
  styleUrls: ['./message-header.component.scss'],
})
export class MessageHeaderComponent implements OnInit {
  @Input() message?: Message;

  constructor() {}

  ngOnInit(): void {}
}
