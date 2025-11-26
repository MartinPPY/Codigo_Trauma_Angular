import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { MaterialModuleModule } from '../../../../shared/material-module/material-module-module';
import { GeneralModule } from '../../../../shared/general/general-module';
import { Admin } from '../../../../services/admin';
import { Alert } from '../../../../services/alert';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { SelectionChange } from '@angular/cdk/collections';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-form',
  imports: [MaterialModuleModule, GeneralModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form implements OnInit {

  adminService = inject(Admin)
  private _alertService = inject(Alert)
  private _fb: FormBuilder = inject(FormBuilder)
  selectedMedics:number[] = []

  pageIndexMedicsForm = signal(0)
  pageSizeMedicsForm = signal(5)

  pageMedicsForm = computed(() => {
    const data = this.adminService.medics()
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
      console.log('Medicos actualizados:', this.adminService.medics.length)
    })
  }

  ngOnInit(): void {
    this.adminService.getAllMedics()
  }

  registerEmergency() {
    console.log(this.emergencyForm.value)
  }

  onPageMedicForm(event: PageEvent) {
    this.pageIndexMedicsForm.set(event.pageIndex)
    this.pageSizeMedicsForm.set(event.pageSize)

  }

  onSelectionChange(event: MatSelectionListChange) {
    const selectedMedics = event.source.selectedOptions.selected.map(op => op.value)
    console.log(selectedMedics)

  }

}
