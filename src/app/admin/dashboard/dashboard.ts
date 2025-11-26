import { Component } from '@angular/core';
import { GeneralModule } from '../../shared/general/general-module';
import { MaterialModuleModule } from '../../shared/material-module/material-module-module';
import { Form } from './components/form/form';
import { Medics } from './components/medics/medics';

@Component({
  selector: 'app-dashboard',
  imports: [GeneralModule, MaterialModuleModule, Form, Medics],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {



}
