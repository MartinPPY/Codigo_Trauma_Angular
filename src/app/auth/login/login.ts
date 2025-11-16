import { Component, signal } from '@angular/core';
import { MaterialModuleModule } from '../../shared/material-module/material-module-module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MaterialModuleModule, RouterLink], 
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login { 

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
