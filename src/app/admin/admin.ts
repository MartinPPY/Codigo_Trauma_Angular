import { Component, inject } from '@angular/core';
import { MaterialModuleModule } from '../shared/material-module/material-module-module';
import { GeneralModule } from '../shared/general/general-module';
import { RouterOutlet } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-admin',
  imports: [MaterialModuleModule, GeneralModule,RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {

  private _authService = inject(Auth)

  logOut(){
    this._authService.logOut()
  }




}
