import { Component, inject, OnInit } from '@angular/core';
import { MaterialModuleModule } from '../shared/material-module/material-module-module';
import { GeneralModule } from '../shared/general/general-module';
import { RouterOutlet } from '@angular/router';
import { Auth } from '../services/auth';
import { Websocket } from '../services/websocket';

@Component({
  selector: 'app-admin',
  imports: [MaterialModuleModule, GeneralModule, RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {

  private _authService = inject(Auth)
  private _ws = inject(Websocket)

  emergency = []

  ngOnInit(): void {
    this._ws.connect(emergency => {
      console.log('nueva emergencia creada!')
    })
  }

  ngOnDestroy(): void {
    this._ws.disconnect();
  }


  logOut() {
    this._authService.logOut()
  }




}
