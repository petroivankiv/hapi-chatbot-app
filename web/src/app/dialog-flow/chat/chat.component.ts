import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { DialogFlowService } from '../dialog-flow.service';
import { Message } from '../types/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('nameInput') nameInput?: ElementRef;

  messages$: Observable<Message[]>;

  minimized?: boolean;
  name = new FormControl('');

  constructor(private service: DialogFlowService) {
    this.messages$ = service.messages;
  }

  ngOnInit(): void {
    this.service.getTextQuery('Hi').subscribe();
  }

  ngAfterViewChecked() {
    this.nameInput?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  onEnter() {
    this.service.addMessageFromUser(this.name.value);
    this.service.getTextQuery(this.name.value).subscribe();
    this.name.setValue('');
  }

  toggleMinimize() {
    this.minimized = !this.minimized;
  }

}
