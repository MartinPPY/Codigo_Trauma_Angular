import { Component, inject, signal } from '@angular/core';
import { MaterialModuleModule } from '../../shared/material-module/material-module-module';
import { GeneralModule } from '../../shared/general/general-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Alert } from '../../services/alert';
import { Auth } from '../../services/auth';
import { RegisterErrorResponse, RegisterRequest } from '../auth.models';

@Component({
  selector: 'app-register',
  imports: [MaterialModuleModule, GeneralModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  private _fb: FormBuilder = inject(FormBuilder)
  private _alertService = inject(Alert)
  private _authService = inject(Auth)
  private _email: string = ''


  error: boolean = false
  isLoading: boolean = false


  emailVerification: FormGroup = this._fb.group({
    email: ['', [Validators.email, Validators.required]]
  })

  registerForm: FormGroup = this._fb.group({
    username: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  async verificateEmail(stepper: MatStepper) {
    this.isLoading = true

    if (this.emailVerification.get('email')?.hasError('required')) {
      this.isLoading = false
      return
    }

    if (this.emailVerification.get('email')?.hasError('email')) {
      this.isLoading = false
      return
    }

    this._email = this.emailVerification.get('email')?.value

    await this._authService.verificateEmail(this._email,stepper)
    const email = this.emailVerification.get('email')?.value
    this._email = email
    this.isLoading = false



  }

  async register(stepper: MatStepper) {

    this.isLoading = true

    console.log(this._email)

    const fields = Object.keys(this.registerForm.controls)
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      if (this.registerForm.get(field)?.hasError('required')) {
        this.isLoading = false
        return
      }
    }

    const registerRequest: RegisterRequest = {
      username: this.registerForm.get('username')?.value,
      name: this.registerForm.get('name')?.value,
      lastname: this.registerForm.get('lastname')?.value,
      phone: this.registerForm.get('phone')?.value,
      password: this.registerForm.get('password')?.value,
      email: this._email
    }

    await this._authService.register(registerRequest,stepper)
    this.isLoading = false
  }

  isMobileOrTablet(): boolean {
    const ua = navigator.userAgent;

    // Detectar tablet
    const isTablet =
      /iPad|Tablet|PlayBook|Silk/i.test(ua) ||
      (/Android/i.test(ua) && !/Mobile/i.test(ua));

    // Detectar móvil
    const isMobile =
      /Mobi|iPhone|Android/i.test(ua);

    return isMobile || isTablet;
  }



}
