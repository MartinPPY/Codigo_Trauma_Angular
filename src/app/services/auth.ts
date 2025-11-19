import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { route } from './route';
import { RegisterRequest } from '../auth/auth.models';

@Injectable({
  providedIn: 'root',
})

export class Auth {

  private _http = inject(HttpClient)


  logIn(username: string, password: string): Observable<any> {
    return this._http.post(`${route}/login`, { username, password })
  }

  verificateEmail(email: string): Observable<any> {
    return this._http.post(`${route}/auth/verificate-email`, { email })
  }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this._http.put(`${route}/auth/register-user`, registerRequest)
  }



}
