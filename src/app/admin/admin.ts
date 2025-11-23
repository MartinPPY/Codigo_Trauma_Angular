import { Component } from '@angular/core';
import { MaterialModuleModule } from '../shared/material-module/material-module-module';
import { GeneralModule } from '../shared/general/general-module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [MaterialModuleModule, GeneralModule,RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {




}
