import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { EmergencyView } from '../admin/admin.models';
import { route } from './route';
import { Alert } from './alert';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Medic {

  private _http = inject(HttpClient)
  private _alert = inject(Alert)
  private _snackBar = inject(MatSnackBar)

  emergency = signal<EmergencyView | null>(null)


  getEmergency(username: string) {
    const token = sessionStorage.getItem('token')
    const header = new HttpHeaders({
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${token}`
    })
    this._http.get<EmergencyView>(`${route}/medic/emergency/${username}`, { headers: header }).subscribe({
      next: (res: EmergencyView) => {
        this.emergency.set(res)
      },
      error: () => {
        this._alert.alert("Error", "Ha ocurrido un error al obtener la emergencia!")
      }
    })
  }

  updateStatus(id: number, state: string) {
    const token = sessionStorage.getItem('token')
    const header = new HttpHeaders({
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${token}`
    })

    const username = sessionStorage.getItem('username') || ''

    this._http.put(`${route}/medic/emergency-status/${id}`, { status: state }, { headers: header }).subscribe({
      next: (res: any) => {
        this.getEmergency(username)
        this._snackBar.open('Emergencia actualizada', 'Deshacer', {
          duration: 3000
        })
      },
      error: () => {
        this._alert.alert('Error', 'Ha ocurrido un error al actualizar la emergencia')
      }
    })
  }

  updateComment(id: number, comment: string) {
    const token = sessionStorage.getItem('token')
    const header = new HttpHeaders({
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${token}`
    })

    const username = sessionStorage.getItem('username') || ''

    this._http.put(`${route}/medic/emergency-comment/${id}`, { comment: comment }, { headers: header }).subscribe({
      next: (res: any) => {
        this.getEmergency(username)
        this._snackBar.open('Emergencia actualizada', 'Deshacer', {
          duration: 3000
        })
      },
      error: () => {
        this._alert.alert('Error', 'Ha ocurrido un error al actualizar la emergencia')
      }
    })
  }

}
