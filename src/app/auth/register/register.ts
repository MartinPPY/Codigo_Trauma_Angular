import { Component, inject, signal } from '@angular/core';
import { MaterialModuleModule } from '../../shared/material-module/material-module-module';
import { GeneralModule } from '../../shared/general/general-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Alert } from '../../services/alert';
import { Auth } from '../../services/auth';
import { RegisterRequest } from '../auth.models';

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

  verificateEmail(stepper: MatStepper) {
    this.isLoading = true

    if (this.emailVerification.get('email')?.hasError('required')) {
      this.isLoading = false
      this._alertService.alert('Error', 'Verifica tu correo electrónico')

      return
    }

    this._email = this.emailVerification.get('email')?.value

    this._authService.verificateEmail(this._email).subscribe({
      next: () => {
        this.isLoading = false
        stepper.next()
      },
      error: () => {
        this.isLoading = false
        this._alertService.alert('Error', 'El correo no existe!')
      },
      complete: () => {
        this.isLoading = false
      }
    })

  }

  register(stepper: MatStepper) {

    this.isLoading = true

    const fields = Object.keys(this.registerForm.controls)
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      if (this.registerForm.get(field)?.hasError('required')) {
        this.isLoading = false
        this._alertService.alert('Error', 'Completa todos los campos')
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

    this._authService.register(registerRequest).subscribe({
      next: () => {
        this.isLoading = false
        stepper.next()
      },
      error: () => {
        this._alertService.alert('Error', '')
      },
      complete: () => {
        this.isLoading = false
      }

    })

  }


}
