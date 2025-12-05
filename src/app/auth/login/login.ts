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

  async logIn() {
    this.isLoading = true

    if (this.loginForm.get('username')?.hasError('required') || this.loginForm.get('password')?.hasError('required')) {
      this.isLoading = false
      return
    }
    const username: string | undefined | null = this.loginForm.get('username')?.value
    const password: string | undefined | null = this.loginForm.get('password')?.value
    await this._authService.logIn(username!, password!)
    this.isLoading = false
  }




}
