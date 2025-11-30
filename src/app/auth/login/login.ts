import { Component, inject, signal } from '@angular/core';
import { MaterialModuleModule } from '../../shared/material-module/material-module-module';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { loginResponse, loginResponseError } from '../auth.models';
import { Alert } from '../../services/alert';

@Component({
  selector: 'app-login',
  imports: [MaterialModuleModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  private _authService = inject(Auth)
  private _fb: FormBuilder = inject(FormBuilder)
  private _alertService = inject(Alert)
  private _router = inject(Router)

  loginForm = this._fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  isLoading: boolean = false;

  logIn() {
    this.isLoading = true

    if (this.loginForm.get('username')?.hasError('required') || this.loginForm.get('password')?.hasError('required')) {
      this._alertService.alert('Error', 'Por favor verifica que las credenciales no esten vacias!.')
      this.isLoading = false
      return
    }

    const username: string | undefined | null = this.loginForm.get('username')?.value
    const password: string | undefined | null = this.loginForm.get('password')?.value

    this._authService.logIn(username!, password!).subscribe({

      next: (res: loginResponse) => {
        sessionStorage.setItem('token', res.token)
        sessionStorage.setItem('username', res.username)
        switch (res.role) {
          case '[ROLE_ADMIN]':
            this._router.navigate(['/admin'])
            break

          case '[ROLE_MEDIC]':
            this._router.navigate(['/medic'])
            break

          default:
            break

        }

      },
      error: (err: loginResponseError) => {
        this.isLoading = false
        this._alertService.alert('Error', "Error al iniciar sesión")
      },
      complete: () => {
        this.isLoading = false
      }
    })


  }




}
