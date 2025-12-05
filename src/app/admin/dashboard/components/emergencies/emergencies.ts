import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { GeneralModule } from '../../../../shared/general/general-module';
import { MaterialModuleModule } from '../../../../shared/material-module/material-module-module';
import { DateFormatPipe } from '../../../../pipes/date-format-pipe';
import { EmergencyService } from '../../../../services/emergency-service';
import { UserService } from '../../../../services/user-service';

@Component({
  selector: 'app-emergencies',
  imports: [GeneralModule, MaterialModuleModule, DateFormatPipe],
  templateUrl: './emergencies.html',
  styleUrl: './emergencies.scss',
})
export class Emergencies implements OnInit {

  emergencyService = inject(EmergencyService)
  userService = inject(UserService)

  panelOpenState = signal<boolean>(false)

  async ngOnInit() {
    await this.emergencyService.getEmergencies()
    await this.userService.getMedics()
  }





}
