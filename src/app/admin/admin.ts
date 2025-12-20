import { Component, inject, OnInit } from '@angular/core';
import { MaterialModuleModule } from '../shared/material-module/material-module-module';
import { GeneralModule } from '../shared/general/general-module';
import { RouterOutlet } from '@angular/router';
import { Auth } from '../services/auth';
import { Websocket } from '../services/websocket';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmergencyService } from '../services/emergency-service';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-admin',
  imports: [MaterialModuleModule, GeneralModule, RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {

  private _authService = inject(Auth)
  private _ws = inject(Websocket)
  private _snackBar = inject(MatSnackBar)
  private _emergencyService = inject(EmergencyService)
  private _userService = inject(UserService)

  ngOnInit() {
    this._ws.connect(async () => {      
      await this._emergencyService.getEmergencies()
      await this._userService.getMedics()
      this._snackBar.open('Ha ocurrido una actualización de emergencias', 'Deshacer', { duration: 3000, verticalPosition: 'top' })
    })
  }

  ngOnDestroy(): void {
    this._ws.disconnect();
  }


  logOut() {
    this._authService.logOut()
  }




}
