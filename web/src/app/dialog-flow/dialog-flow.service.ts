import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { getLinkData, getQuickReplies, getResponseType, getText } from './dialog-flow.utils';
import { Message } from './types/message.interface';
import { QueryTextResponse } from './types/response.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class DialogFlowService {
  private messagesSub: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient) {}

  get messages(): Observable<Message[]> {
    return this.messagesSub.asObservable();
  }

  get values(): Message[] {
    return this.messagesSub.getValue();
  }

  getTextQuery(text: string): Observable<any> {
    return this.http.post<QueryTextResponse>(environment.apiUrl + '/api/text-query', { text }, httpOptions).pipe(
      tap((res) => {
        const responseType = getResponseType(res);
        const link = getLinkData(res, responseType);
        const quickReplies = getQuickReplies(res, responseType);

        const message = {
          time: new Date(),
          quickReplies: quickReplies?.options,
          isBot: true,
          text: quickReplies?.text || getText(res),
          author: 'Bot',
          responseType,
          link,
        };
        console.log(message);
        this.messagesSub.next([...this.values, message]);
      })
    );
  }

  getEventQuery(event: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/event-query', { event });
  }

  addMessageFromUser(message: string): void {
    this.messagesSub.next([...this.values, { text: message, author: 'You', time: new Date() }]);
  }
}
