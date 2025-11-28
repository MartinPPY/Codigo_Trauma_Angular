import { Component } from '@angular/core';
import { GeneralModule } from '../../../../shared/general/general-module';
import { MaterialModuleModule } from '../../../../shared/material-module/material-module-module';

@Component({
  selector: 'app-emergency-comment',
  imports: [GeneralModule,MaterialModuleModule],
  templateUrl: './emergency-comment.html',
  styleUrl: './emergency-comment.scss',
})
export class EmergencyComment {

}
