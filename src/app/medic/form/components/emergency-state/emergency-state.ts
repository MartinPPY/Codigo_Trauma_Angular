import { Component } from '@angular/core';
import { GeneralModule } from '../../../../shared/general/general-module';
import { MaterialModuleModule } from '../../../../shared/material-module/material-module-module';

@Component({
  selector: 'app-emergency-state',
  imports: [GeneralModule,MaterialModuleModule],
  templateUrl: './emergency-state.html',
  styleUrl: './emergency-state.scss',
})
export class EmergencyState {

}
