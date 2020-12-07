/* eslint-disable no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Gun } from './home';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  endpoint = 'http://localhost:5000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  // eslint-disable-next-line no-unused-vars
  constructor(private http: HttpClient) { }

  allGuns$ = new Subject <Gun[]>()

  getIssues(): Observable <Gun[]> {
    return this.http.get<Gun[]>(`${this.endpoint}/`);
  }

  getIssueById(id: any) {
    return this.http.get<Gun>(`${this.endpoint}/issues/${id}`);
  }

  addIssue(gun: Gun): Observable<Gun> {
    return this.http.post<Gun>(this.endpoint, gun, this.httpOptions);
  }

  deleteIssue(id: any) {
    return this.http.get(`${this.endpoint}/issues/delete/${id}`);
  }
}
