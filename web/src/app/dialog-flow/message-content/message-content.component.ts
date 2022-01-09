import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogFlowService } from '../dialog-flow.service';
import { Message, QuickReply } from '../types/message.interface';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss'],
})
export class MessageContentComponent implements OnInit {
  @Input() message?: Message;

  constructor(private router: Router, private service: DialogFlowService) {}

  ngOnInit(): void {}

  handleOpenLink(params: any, path: any) {
    this.router.navigate([path, params]).then();
  }

  onQuickReply(option: QuickReply) {
    if (option.text) {
      this.service.getTextQuery(option.text).subscribe();
    }

    if (option.event) {
      this.service.getEventQuery(option.event).subscribe();
    }
  }
}
