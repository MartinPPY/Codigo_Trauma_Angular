import { Component, computed, effect, inject, signal } from '@angular/core';
import { GeneralModule } from '../../../../shared/general/general-module';
import { MaterialModuleModule } from '../../../../shared/material-module/material-module-module';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../../../../services/user-service';

@Component({
  selector: 'app-medics',
  imports: [GeneralModule, MaterialModuleModule],
  templateUrl: './medics.html',
  styleUrl: './medics.scss',
})
export class Medics {

  userService = inject(UserService)

  isLoading:boolean = false

  pageIndexMedicsList = signal(0)
  pageSizeMedicsList = signal(8)

  pageMedicsList = computed(() => {
    const data = this.userService.medics()
    const start = this.pageIndexMedicsList() * this.pageSizeMedicsList()
    const end = start + this.pageSizeMedicsList()
    return data.slice(start, end)
  })


  constructor() {
    effect(() => {
      
    })
  }

  async ngOnInit() {
    this.isLoading = true
    await this.userService.getMedics()
    this.isLoading = false
  }

  onPageMedicList(event: PageEvent) {
    this.pageIndexMedicsList.set(event.pageIndex)
    this.pageSizeMedicsList.set(event.pageSize)

  }

}
