import { Component, effect, inject, Input, input, Signal } from '@angular/core';
import { GeneralModule } from '../../../../shared/general/general-module';
import { MaterialModuleModule } from '../../../../shared/material-module/material-module-module';
import { EmergencyView } from '../../../../admin/admin.models';
import { FormBuilder, Validators } from '@angular/forms';
import { Medic } from '../../../../services/medic';

@Component({
  selector: 'app-emergency-state',
  imports: [GeneralModule, MaterialModuleModule],
  templateUrl: './emergency-state.html',
  styleUrl: './emergency-state.scss',
})
export class EmergencyState {

  @Input() emergency!: Signal<EmergencyView | null>
  private _fb: FormBuilder = inject(FormBuilder)
  private _medicService = inject(Medic)

  stateForm = this._fb.group({
    state: ['', [Validators.required]]
  })

  constructor() {

    effect(() => {

      const emergency = this.emergency();
      if (!emergency) return;

      this.stateForm.get('state')?.setValue(this.emergency()?.comments || '')


    })
  }

  updateState(id:number) {

    if (this.stateForm.get('state')?.hasError('required')) {
      return
    }
    const state = this.stateForm.get('state')!.value || ''
    this._medicService.updateStatus(id,state)


  }


}
