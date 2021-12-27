import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { Message } from './types/message.interface';
import { QueryTextResponse } from './types/response.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class DialogFlowService {

  private messagesSub: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient) {
  }

  get messages(): Observable<Message[]> {
    return this.messagesSub.asObservable();
  }

  get values(): Message[] {
    return this.messagesSub.getValue();
  }

  getTextQuery(text: string): Observable<any> {
    return this.http.post<QueryTextResponse>(environment.apiUrl + '/api/text-query', { text }, httpOptions)
      .pipe(
        tap(({ data }) => {
          const messages: Message[] = data[0].fulfillmentMessages.map(msg =>
            ({ text: msg.text.text[0], time: new Date(), isBot: true, author: 'Bot' })
          );

          const parameters = data[0].parameters.fields;
          const params = Object.keys(parameters).reduce((acc, param) => {
            const parameter: { kind: string; [key: string]: string } = parameters[param];
            const value = parameter[parameter.kind];

            if (!value) {
              return acc;
            }

            return { ...acc, [param]: value };
          }, {});
          const paramMessage = { time: new Date(), isBot: true, author: 'Bot', params };

          this.messagesSub.next([...this.values, ...messages, paramMessage]);
        })
      );
  }

  getEventQuery(event: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/event-query', { event });
  }

  addMessageFromUser(message: string): void {
    this.messagesSub.next([
      ...this.values,
      { text: message, author: 'You', time: new Date() }
    ]);
  }
}
