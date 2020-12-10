/* eslint-disable no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Modifiers } from '../app/DataModifiers';
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
    return this.http.get<Gun[]>(`${this.endpoint}/`);
  }

  getModifiers(): Observable<Modifiers> {
    return this.http.get<Modifiers>(`${this.endpoint}/`);
  }

  updateModifiers(modifiers: Modifiers): Observable<any> {
    return this.http.put(this.endpoint, modifiers, this.httpOptions);
  }

  getIssueById(id: any) {
    return this.http.get<Gun>(`${this.endpoint}/${id}`);
  }

  deleteIssue(id: any) {
    return this.http.get(`${this.endpoint}/issues/delete/${id}`);
  }
}
