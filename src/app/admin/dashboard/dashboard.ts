import { Component } from '@angular/core';
import { GeneralModule } from '../../shared/general/general-module';
import { MaterialModuleModule } from '../../shared/material-module/material-module-module';
import { Form } from './components/form/form';
import { Medics } from './components/medics/medics';
import { Emergencies } from './components/emergencies/emergencies';

@Component({
  selector: 'app-dashboard',
  imports: [GeneralModule, MaterialModuleModule, Form, Medics,Emergencies],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {



}
