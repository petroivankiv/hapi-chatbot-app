import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { Message, ResponseType } from './types/message.interface';
import { QueryTextResponse } from './types/response.interface';

function getParamValue(parameters: Record<string, { kind: string; [key: string]: string }>, param: string) {
  const parameter: { kind: string; [key: string]: string } = parameters[param];
  return parameter[parameter.kind];
}

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
          const parameters = data[0].parameters.fields;
          const paramKeys = Object.keys(parameters);
          const payload = data[0].fulfillmentMessages[1]?.payload;
          const responseType = (getParamValue(payload.fields, 'response_type') || 'text') as ResponseType;
          const linkRecord: any = getParamValue(payload.fields, 'link');

          const params = paramKeys?.length ? paramKeys.reduce((acc, param) => {
            const value = getParamValue(parameters, param);

            if (!value) {
              return acc;
            }

            return { ...acc, [param]: value };
          }, {}) : undefined;

          const link = {
            label: getParamValue(linkRecord.fields, 'label'),
            path: getParamValue(linkRecord.fields, 'path'),
            params
          };

          const message = { time: new Date(), isBot: true, text: data[0].fulfillmentMessages[0].text.text[0], author: 'Bot', responseType, link };

          this.messagesSub.next([...this.values, message]);
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
