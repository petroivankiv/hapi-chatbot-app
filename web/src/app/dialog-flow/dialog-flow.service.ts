import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DialogFlowService {

  constructor(private http: HttpClient) { }

  getTextQuery(text: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/text-query', { text });
  }

  getEventQuery(event: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/event-query', { event });
  }
}
