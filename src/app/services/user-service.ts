import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { route } from './route';
import { Medic } from '../admin/admin.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UserService {


  private _http = inject(HttpClient)
  private _snackBar = inject(MatSnackBar)

  medics = signal<Medic[]>([])

  medicsActive = computed(() => this.medics().filter(m => m.availability === true).length)

  async getMedics() {

    const token = sessionStorage.getItem('token')
    const header = new HttpHeaders({
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${token}`
    })

    try {
      const response: Medic[] = await firstValueFrom(this._http.get<Medic[]>(`${route}/users/medics`, { headers: header }))
      this.medics.set(response.filter(m=>m.name !== null))

    } catch (error: any) {
      this._snackBar.open('Ha ocurrido un error al obtener los medicos!', 'Deshacer', { duration: 3000, verticalPosition: 'top' })
    }

  }

}
