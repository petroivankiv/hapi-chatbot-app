import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DialogFlowService } from '../dialog-flow.service';

export interface Message {
  author: string;
  time: Date;
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [
    {
      author: 'Photos',
      time: new Date('1/1/16'),
      text: 'Hello'
    },
    {
      author: 'Recipes',
      time: new Date('1/17/16'),
      text: 'Hi'
    },
    {
      author: 'Work',
      time: new Date('1/28/16'),
      text: 'Good day'
    },
  ];

  minimized?: boolean;
  name = new FormControl('');

  constructor(private service: DialogFlowService) { }

  ngOnInit(): void {
  }

  onEnter() {
    this.service.getTextQuery(this.name.value).subscribe(message => {
      console.log(message);
    });

    this.name.setValue('');
  }

  toggleMinimize() {
    this.minimized = !this.minimized;
  }

}
