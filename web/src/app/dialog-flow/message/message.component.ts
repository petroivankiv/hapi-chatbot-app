import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../types/message.interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message?: Message;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleOpen(params: any, path: any) {
    this.router.navigate([path, params]).then();
  }
}
