import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { route } from './route';
import { loginResponse, RegisterRequest } from '../auth/auth.models';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';

@Injectable({
  providedIn: 'root',
})

export class Auth {

  private _http = inject(HttpClient)
  private _router = inject(Router)
  private _snackBar = inject(MatSnackBar)


  async logIn(username: string, password: string) {

    try {

      const response: loginResponse = await firstValueFrom(this._http.post<loginResponse>(`${route}/login`, { username, password }))
      sessionStorage.setItem('username', response.username)
      sessionStorage.setItem('token', response.token)
      this._snackBar.open(`${response.message}`, 'Deshacer', { duration: 3000, verticalPosition: 'top' })
      switch (response.role) {
        case '[ROLE_ADMIN]':
          this._router.navigate(['/admin'])
          break

        case '[ROLE_MEDIC]':
          this._router.navigate(['/medic'])
          break

        default:
          break

      }

    } catch (err: any) {
      this._snackBar.open(`Ha ocurrido un error: ${err.error.message}`, 'Deshacer', { duration: 3000, verticalPosition: 'top' })
    }

  }

  async verificateEmail(email: string, stepper: MatStepper) {
    try {
      await firstValueFrom(this._http.post(`${route}/auth/verificate-email`, { email }))
      stepper.next()
    } catch (error: any) {
      this._snackBar.open('Ha ocurrido un error al verificar tu correo, intenta mas tarde', 'Deshacer', { duration: 3000, verticalPosition: 'top' })
    }
  }

  async register(registerRequest: RegisterRequest, stepper: MatStepper) {
    try {
      await firstValueFrom(this._http.put(`${route}/auth/register-user`, registerRequest))
      stepper.next()
    } catch (error: any) {
      this._snackBar.open(`Ha ocurrido un error: ${error.error.message}`, 'Deshacer', { duration: 3000, verticalPosition: 'top' })
    }
  }

  logOut() {
    sessionStorage.clear()
    this._router.navigate(['auth/login'])
  }



}
