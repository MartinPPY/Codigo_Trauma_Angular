import { Component, effect, inject, Input, input, OnInit, Signal } from '@angular/core';
import { GeneralModule } from '../../../../shared/general/general-module';
import { MaterialModuleModule } from '../../../../shared/material-module/material-module-module';
import { EmergencyView } from '../../../../admin/admin.models';
import { FormBuilder } from '@angular/forms';
import { Medic } from '../../../../services/medic';

@Component({
  selector: 'app-emergency-comment',
  imports: [GeneralModule, MaterialModuleModule],
  templateUrl: './emergency-comment.html',
  styleUrl: './emergency-comment.scss',
})
export class EmergencyComment {


  @Input() emergency!: Signal<EmergencyView | null>

  private _fb: FormBuilder = inject(FormBuilder)
  private _medicService = inject(Medic)

  commentForm = this._fb.group({
    comment: ['']
  })

  constructor() {
    effect(() => {

      const emergency = this.emergency()
      if (!emergency) return

      console.log(emergency)

      this.commentForm.patchValue(
        { comment: emergency.comments },
        { emitEvent: false }
      );

    })
  }

  updateComment(id: number) {
    if (this.commentForm.get('comment')!.value!.length == 0) {
      return
    }

    const comment = this.commentForm.get('comment')!.value || ''

    this._medicService.updateComment(id, comment)

  }





}
