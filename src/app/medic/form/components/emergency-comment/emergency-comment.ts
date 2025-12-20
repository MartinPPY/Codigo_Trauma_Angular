import { Component, effect, inject, Input, input, OnInit, Signal } from '@angular/core';
import { GeneralModule } from '../../../../shared/general/general-module';
import { MaterialModuleModule } from '../../../../shared/material-module/material-module-module';
import { EmergencyView } from '../../../../admin/admin.models';
import { FormBuilder } from '@angular/forms';
import { EmergencyService } from '../../../../services/emergency-service';
import { Websocket } from '../../../../services/websocket';

@Component({
  selector: 'app-emergency-comment',
  imports: [GeneralModule, MaterialModuleModule],
  templateUrl: './emergency-comment.html',
  styleUrl: './emergency-comment.scss',
})
export class EmergencyComment implements OnInit {


  @Input() emergency!: Signal<EmergencyView | null>

  private _fb: FormBuilder = inject(FormBuilder)
  private _emergencyService = inject(EmergencyService)
  private _ws = inject(Websocket)

  isLoading: boolean = false
  isLoadingForm: boolean = false


  commentForm = this._fb.group({
    comment: ['']
  })


  async ngOnInit() {
    
    this._ws.connect(async () => {
      await this._emergencyService.getEmergency()
      this.commentForm.get('comment')?.setValue(this._emergencyService.emergency()!.comments)
    })
    this.isLoading = true
    await this._emergencyService.getEmergency()
    this.commentForm.get('comment')?.setValue(this._emergencyService.emergency()!.comments)
    this.isLoading = false
  }

  async updateComment(id: number) {
    this.isLoadingForm = true
    if (this.commentForm.get('comment')!.value!.length == 0) {
      this.isLoadingForm = false
      return
    }

    const comment = this.commentForm.get('comment')!.value || ''

    await this._emergencyService.updateComment(id, comment)
    await this._emergencyService.getEmergency()

    this.isLoadingForm = false

  }





}
