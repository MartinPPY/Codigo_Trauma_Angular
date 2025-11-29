import { Component, effect, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../shared/general/general-module';
import { MaterialModuleModule } from '../../shared/material-module/material-module-module';
import { EmergencyInfo } from './components/emergency-info/emergency-info';
import { EmergencyState } from './components/emergency-state/emergency-state';
import { EmergencyComment } from './components/emergency-comment/emergency-comment';
import { Medic } from '../../services/medic';

@Component({
  selector: 'app-form',
  imports: [GeneralModule, MaterialModuleModule, EmergencyInfo, EmergencyState, EmergencyComment],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {

  medicService = inject(Medic)

  ngOnInit(): void {
    const username = sessionStorage.getItem('username') || ''
    this.medicService.getEmergency(username)
  }

  constructor() {
    effect(() => {
      console.log(this.medicService.emergency())
    })
  }



}
