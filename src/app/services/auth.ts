import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { route } from './route';

@Injectable({
  providedIn: 'root',
})

export class Auth {

  private _http = inject(HttpClient)
  

  logIn(username: string, password: string): Observable<any> {
    return this._http.post(`${route}/login`, { username, password })
  }



}
