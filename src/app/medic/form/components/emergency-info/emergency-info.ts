import { Component, Input, Signal } from '@angular/core';
import { MaterialModuleModule } from '../../../../shared/material-module/material-module-module';
import { GeneralModule } from '../../../../shared/general/general-module';
import { EmergencyView } from '../../../../admin/admin.models';
import { DateFormatPipe } from '../../../../pipes/date-format-pipe';

@Component({ 
  selector: 'app-emergency-info',
  imports: [MaterialModuleModule,GeneralModule,DateFormatPipe],
  templateUrl: './emergency-info.html',
  styleUrl: './emergency-info.scss',
})
export class EmergencyInfo {


  @Input() emergency!:Signal<EmergencyView | null>

}
