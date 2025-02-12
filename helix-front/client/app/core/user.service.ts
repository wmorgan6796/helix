import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Settings } from './settings';

@Injectable()
export class UserService {
  constructor(protected router: Router, private http: HttpClient) {}

  public getCurrentUser(): Observable<unknown> {
    return this.http
      .get(`${Settings.userAPI}/current`, { headers: this.getHeaders() })
      .pipe(catchError((_) => _));
  }

  public login(username: string, password: string): Observable<object> {
    return this.http.post(
      `${Settings.userAPI}/login`,
      { username, password },
      { headers: this.getHeaders() }
    );
  }

  protected getHeaders() {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
