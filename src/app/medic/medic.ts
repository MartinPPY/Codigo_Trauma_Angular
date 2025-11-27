import { Component } from '@angular/core';
import { GeneralModule } from '../shared/general/general-module';
import { MaterialModuleModule } from '../shared/material-module/material-module-module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-medic',
  imports: [GeneralModule, MaterialModuleModule,RouterOutlet],
  templateUrl: './medic.html',
  styleUrl: './medic.scss',
})
export class Medic {

}
