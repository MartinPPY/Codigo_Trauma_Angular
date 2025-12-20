import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../shared/general/general-module';
import { MaterialModuleModule } from '../shared/material-module/material-module-module';
import { RouterOutlet } from '@angular/router';
import { Auth } from '../services/auth';
import { Websocket } from '../services/websocket';
import { EmergencyService } from '../services/emergency-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-medic',
  imports: [GeneralModule, MaterialModuleModule, RouterOutlet],
  templateUrl: './medic.html',
  styleUrl: './medic.scss',
})
export class Medic implements OnInit {


  authService = inject(Auth)
  private _ws = inject(Websocket)
  private _emergencyService = inject(EmergencyService)
  private _snackBar = inject(MatSnackBar)

  ngOnInit() {

    this._ws.connect(async () => {
      await this._emergencyService.getEmergency()
      this._snackBar.open('Ha ocurrido una actualización en tu emergencia', 'Deshacer', { duration: 3000, verticalPosition: 'top' })
    })

  }

}
