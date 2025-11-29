import { Component, inject } from '@angular/core';
import { GeneralModule } from '../shared/general/general-module';
import { MaterialModuleModule } from '../shared/material-module/material-module-module';
import { RouterOutlet } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-medic',
  imports: [GeneralModule, MaterialModuleModule,RouterOutlet],
  templateUrl: './medic.html',
  styleUrl: './medic.scss',
})
export class Medic {


  authService = inject(Auth)

}
