import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModuleModule } from '../shared/material-module/material-module-module';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet,MaterialModuleModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {

}
