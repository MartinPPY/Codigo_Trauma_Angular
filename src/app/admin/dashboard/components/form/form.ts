import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { MaterialModuleModule } from '../../../../shared/material-module/material-module-module';
import { GeneralModule } from '../../../../shared/general/general-module';
import { Alert } from '../../../../services/alert';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { SelectionChange } from '@angular/cdk/collections';
import { MatSelectionListChange } from '@angular/material/list';
import { Emergency } from '../../../admin.models';
import { UserService } from '../../../../services/user-service';
import { EmergencyService } from '../../../../services/emergency-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  imports: [MaterialModuleModule, GeneralModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form implements OnInit {

  private _snackBar = inject(MatSnackBar)
  private _fb: FormBuilder = inject(FormBuilder)

  selectedMedics: number[] = []

  isLoading:boolean = false

  userService = inject(UserService)
  emergencyService = inject(EmergencyService)

  pageIndexMedicsForm = signal(0)
  pageSizeMedicsForm = signal(5)

  pageMedicsForm = computed(() => {
    const data = this.userService.medics()
    const start = this.pageIndexMedicsForm() * this.pageSizeMedicsForm()
    const end = start + this.pageSizeMedicsForm()
    return data.slice(start, end)
  })


  emergencyForm: FormGroup = this._fb.group({
    description: ['', [Validators.required]],
    victims: ['', [Validators.required]],
    severity: ['', [Validators.required]]
  })


  constructor() {
    effect(() => {
      
    })
  }

  async ngOnInit() {
    await this.userService.getMedics()
  }

  async registerEmergency() {

    this.isLoading = true

    if (this.emergencyForm.get('description')?.hasError('required')) {
      this.isLoading = false
      return
    }

    if (this.emergencyForm.get('victims')?.hasError('required')) {
      this.isLoading = false
      return
    }

    if (this.emergencyForm.get('severity')?.hasError('required')) {
      this.isLoading = false
      return
    }

    if(this.selectedMedics.length == 0){
      this._snackBar.open('No has seleccionado los medicos!','Deshacer')
      this.isLoading = false
      return
    }

    const emergency: Emergency = {
      description: this.emergencyForm.get('description')?.value,
      medics: this.selectedMedics,
      severity: this.emergencyForm.get('severity')?.value,
      victims: this.emergencyForm.get('victims')?.value
    }

    await this.emergencyService.addEmergency(emergency)
    await this.userService.getMedics()
    this.isLoading = false


  }

  onPageMedicForm(event: PageEvent) {
    this.pageIndexMedicsForm.set(event.pageIndex)
    this.pageSizeMedicsForm.set(event.pageSize)

  }

  onSelectionChange(event: MatSelectionListChange) {
    const selectedMedics = event.source.selectedOptions.selected.map(op => op.value)
    this.selectedMedics = selectedMedics

  }

}
