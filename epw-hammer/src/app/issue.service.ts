/* eslint-disable no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  allGuns$ = new BehaviorSubject <Gun[]>([])

  getIssues(): Observable <Gun[]> {
    return this.http.get<Gun[]>(`${this.endpoint}/`)
      .pipe(tap((guns) => {
        this.allGuns$.next(guns);
      }));
  }

  getIssueById(id: any) {
    return this.http.get<Gun>(`${this.endpoint}/issues/${id}`);
  }

  deleteIssue(id: any) {
    return this.http.get(`${this.endpoint}/issues/delete/${id}`);
  }
}
