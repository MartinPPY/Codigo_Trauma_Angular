import { Component, inject, signal } from '@angular/core';
import { MaterialModuleModule } from '../../shared/material-module/material-module-module';
import { GeneralModule } from '../../shared/general/general-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-register',
  imports: [MaterialModuleModule, GeneralModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  private _fb: FormBuilder = inject(FormBuilder)
  error: boolean = false

  emailVerification: FormGroup = this._fb.group({
    email: ['', [Validators.email, Validators.required]]
  })

  registerForm: FormGroup = this._fb.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.requiredTrue]],
    phone: ['', [Validators.requiredTrue]],
    password: ['', [Validators.requiredTrue]]
  })

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  verificateEmail( stepper:MatStepper ) {

    if (this.emailVerification.get('email')?.hasError('required')) {
      alert('hay un error')
      return
    }

    stepper.next()

  }




}
