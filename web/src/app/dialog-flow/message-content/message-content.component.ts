import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../types/message.interface';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss'],
})
export class MessageContentComponent implements OnInit {
  @Input() message?: Message;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleOpen(params: any, path: any) {
    this.router.navigate([path, params]).then();
  }
}
