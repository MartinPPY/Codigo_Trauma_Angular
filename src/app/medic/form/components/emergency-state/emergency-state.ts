import { Component, effect, inject, Input, input, OnInit, Signal } from '@angular/core';
import { GeneralModule } from '../../../../shared/general/general-module';
import { MaterialModuleModule } from '../../../../shared/material-module/material-module-module';
import { EmergencyView } from '../../../../admin/admin.models';
import { FormBuilder, Validators } from '@angular/forms';
import { EmergencyService } from '../../../../services/emergency-service';
import { Websocket } from '../../../../services/websocket';

@Component({
  selector: 'app-emergency-state',
  imports: [GeneralModule, MaterialModuleModule],
  templateUrl: './emergency-state.html',
  styleUrl: './emergency-state.scss',
})
export class EmergencyState implements OnInit {

  @Input() emergency!: Signal<EmergencyView | null>
  private _fb: FormBuilder = inject(FormBuilder)
  private _emergencyService = inject(EmergencyService)
  isLoading: boolean = false
  isLoadingForm: boolean = false
  private _ws = inject(Websocket)



  stateForm = this._fb.group({
    state: ['', [Validators.required]]
  })

  async ngOnInit() {

    this._ws.connect(async () => {
      await this._emergencyService.getEmergency()
      this.stateForm.get('state')?.setValue(this._emergencyService.emergency()!.status)
    })

    this.isLoading = true
    await this._emergencyService.getEmergency()
    this.stateForm.get('state')?.setValue(this._emergencyService.emergency()!.status)
    this.isLoading = false
  }

  async updateState(id: number) {
    this.isLoadingForm = true
    if (this.stateForm.get('state')?.hasError('required')) {
      this.isLoadingForm = false
      return
    }

    const state = this.stateForm.get('state')!.value || ''

    await this._emergencyService.updateStatus(id, state)
    await this._emergencyService.getEmergency()

    this.isLoadingForm = false


  }


}
