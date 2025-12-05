import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Emergency, EmergencyView } from '../admin/admin.models';
import { firstValueFrom } from 'rxjs';
import { route } from './route';

@Injectable({
  providedIn: 'root',
})
export class EmergencyService {
  private _http = inject(HttpClient)
  private _snackBar = inject(MatSnackBar)

  emergencies = signal<EmergencyView[]>([])
  emergency = signal<EmergencyView | null>(null)

  async getEmergencies() {

    try {

      const token = sessionStorage.getItem('token')
      const header = new HttpHeaders({
        'Content-Type': 'Application/json',
        'Authorization': `Bearer ${token}`
      })

      const response: EmergencyView[] = await firstValueFrom(this._http.get<EmergencyView[]>(`${route}/emergencies`, { headers: header }))
      this.emergencies.set(response)

    } catch (error) {
      this._snackBar.open('Ha ocurrido un error al cargar las emergencias, intente mas tarde', 'deshacer')
    }
  }

  async addEmergency(emergency: Emergency) {
    const token = sessionStorage.getItem('token')
    const header = new HttpHeaders({
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${token}`
    })

    try {

      await firstValueFrom(this._http.post(`${route}/emergencies`, emergency, { headers: header }))
      this._snackBar.open('Emergencia Agregada!', 'Deshacer', { duration: 3000, verticalPosition: 'top' })
      await this.getEmergencies()

    } catch (error: any) {

      this._snackBar.open('Ha ocurrido un error al registrar la emergencia!, intente mas tarde', 'Deshacer', { duration: 3000, verticalPosition: 'top' })
    }
  }

  async getEmergency() {
    const token = sessionStorage.getItem('token')
    const header = new HttpHeaders({
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${token}`
    })

    try {

      const username = sessionStorage.getItem('username')
      const response: EmergencyView = await firstValueFrom(this._http.get<EmergencyView>(`${route}/emergencies/${username!}`, { headers: header }))
      this.emergency.set(response)

    } catch (error: any) {
      this._snackBar.open('Ha ocurrido un error al obtener la emergencia!, intente mas tarde', 'Deshacer', { duration: 3000, verticalPosition: 'top' })
    }

  }

  async updateStatus(id: number, status: string) {

    const token = sessionStorage.getItem('token')
    const header = new HttpHeaders({
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${token}`
    })

    try {
      await firstValueFrom(this._http.put(`${route}/emergencies/status/${id}`, { status }, { headers: header }))
      this._snackBar.open('Estado de la emergencia actualizado', 'Deshacer', { duration: 3000, verticalPosition: 'top' })

      this.emergencies.update(list => list.map(e => e.id === id ? { ...e, status } : e))

    } catch (error: any) {
      this._snackBar.open('Ha ocurrido un error al obtener la emergencia!, intente mas tarde', 'Deshacer', { duration: 3000, verticalPosition: 'top' })
    }

  }

  async updateComment(id: number, comment: string) {

    const token = sessionStorage.getItem('token')
    const header = new HttpHeaders({
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${token}`
    })

    try {
      await firstValueFrom(this._http.put(`${route}/emergencies/comment/${id}`, { comment }, { headers: header }))
      this._snackBar.open('Comentario de la emergencia actualizado', 'Deshacer', { duration: 3000, verticalPosition: 'top' })
      this.emergencies.update(list => list.map(e => e.id === id ? { ...e, comment } : e))

    } catch (error: any) {
      this._snackBar.open('Ha ocurrido un error al obtener la emergencia!, intente mas tarde', 'Deshacer', { duration: 3000, verticalPosition: 'top' })
    }
  }


}
