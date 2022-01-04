import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-icon',
  templateUrl: './message-icon.component.html',
  styleUrls: ['./message-icon.component.scss'],
})
export class MessageIconComponent implements OnInit {
  @Input() isBot?: boolean;

  constructor() {}

  ngOnInit(): void {}
}
