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
  private initializeSub = new BehaviorSubject(false);
  private messagesSub: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient) {}

  get initialized(): Observable<boolean> {
    return this.initializeSub.asObservable();
  }

  get messages(): Observable<Message[]> {
    return this.messagesSub.asObservable();
  }

  get values(): Message[] {
    return this.messagesSub.getValue();
  }

  getTextQuery(text: string): Observable<any> {
    return this.http
      .post<QueryTextResponse>(environment.apiUrl + '/api/text-query', { text }, httpOptions)
      .pipe(tap((res) => this.responseHandler(res, this.messagesSub)));
  }

  getEventQuery(event: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/event-query', { event }).pipe(
      tap((res) => this.responseHandler(res, this.messagesSub)),
      tap(() => this.initializeSub.next(true))
    );
  }

  addMessageFromUser(message: string): void {
    this.messagesSub.next([...this.values, { text: message, author: 'You', time: new Date() }]);
  }

  private responseHandler(res: any, messagesSub: BehaviorSubject<Message[]>) {
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

    messagesSub.next([...this.values, message]);
  }
}
