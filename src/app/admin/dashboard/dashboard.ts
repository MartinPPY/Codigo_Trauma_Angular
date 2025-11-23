import { Component } from '@angular/core';
import { GeneralModule } from '../../shared/general/general-module';
import { MaterialModuleModule } from '../../shared/material-module/material-module-module';

@Component({
  selector: 'app-dashboard',
  imports: [GeneralModule,MaterialModuleModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
