import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { GeneralModule } from '../../../../shared/general/general-module';
import { MaterialModuleModule } from '../../../../shared/material-module/material-module-module';
import { Admin } from '../../../../services/admin';
import { DateFormatPipe } from '../../../../pipes/date-format-pipe';

@Component({
  selector: 'app-emergencies',
  imports: [GeneralModule, MaterialModuleModule,DateFormatPipe],
  templateUrl: './emergencies.html',
  styleUrl: './emergencies.scss',
})
export class Emergencies implements OnInit {

  adminService = inject(Admin)
  readonly panelOpenState = signal(false);

  ngOnInit(): void {
    this.adminService.getEmergencies()
  }

  



}
