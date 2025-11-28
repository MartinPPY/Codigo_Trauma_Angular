import { Component } from '@angular/core';
import { MaterialModuleModule } from '../../../../shared/material-module/material-module-module';
import { GeneralModule } from '../../../../shared/general/general-module';

@Component({
  selector: 'app-emergency-info',
  imports: [MaterialModuleModule,GeneralModule],
  templateUrl: './emergency-info.html',
  styleUrl: './emergency-info.scss',
})
export class EmergencyInfo {

}
