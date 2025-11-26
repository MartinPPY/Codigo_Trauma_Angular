import { Component, computed, effect, inject, signal } from '@angular/core';
import { GeneralModule } from '../../../../shared/general/general-module';
import { MaterialModuleModule } from '../../../../shared/material-module/material-module-module';
import { Admin } from '../../../../services/admin';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-medics',
  imports: [GeneralModule, MaterialModuleModule],
  templateUrl: './medics.html',
  styleUrl: './medics.scss',
})
export class Medics {

  adminService = inject(Admin)

  pageIndexMedicsList = signal(0)
  pageSizeMedicsList = signal(8)

  pageMedicsList = computed(() => {
    const data = this.adminService.medics()
    const start = this.pageIndexMedicsList() * this.pageSizeMedicsList()
    const end = start + this.pageSizeMedicsList()
    return data.slice(start, end)
  })


  constructor() {
    effect(() => {
      console.log('Medicos actualizados:', this.adminService.medics.length)
    })
  }

  ngOnInit(): void {
    this.adminService.getAllMedics()
  }

  onPageMedicList(event: PageEvent) {
    this.pageIndexMedicsList.set(event.pageIndex)
    this.pageSizeMedicsList.set(event.pageSize)

  }

}
