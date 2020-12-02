/* eslint-disable no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gun } from './home';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  endpoint = 'http://localhost:5000';

  // eslint-disable-next-line no-unused-vars
  constructor(private http: HttpClient) { }

  getIssues(): Observable <Gun[]> {
    return this.http.get<Gun[]>(`${this.endpoint}/`);
  }

  getIssueById(id: any) {
    return this.http.get(`${this.endpoint}/issues/${id}`);
  }

  addIssue(title: any, responsible: any, description: any, severity: any) {
    const issue = {
      title,
      responsible,
      description,
      severity,
    };
    return this.http.post(`${this.endpoint}/issues/add`, issue);
  }

  deleteIssue(id: any) {
    return this.http.get(`${this.endpoint}/issues/delete/${id}`);
  }
}
