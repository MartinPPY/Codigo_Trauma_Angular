import { Component, inject } from '@angular/core';
import { GeneralModule } from '../../shared/general/general-module';
import { MaterialModuleModule } from '../../shared/material-module/material-module-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [GeneralModule, MaterialModuleModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  private _fb: FormBuilder = inject(FormBuilder)


  emergencyForm: FormGroup = this._fb.group({
    description: ['', [Validators.required]],
    victims: [0, [Validators.required]],
    severity: ['', [Validators.required]]
  })

  medics = []
  emergencies = []

  registerEmergency(){

    console.log(this.emergencyForm.value)
  }



}
