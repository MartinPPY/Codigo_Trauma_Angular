import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { EmergencyView } from '../admin/admin.models';
import { route } from './route';
import { Admin } from './admin';

@Injectable({
  providedIn: 'root',
})
export class Medic {

  private _http = inject(HttpClient)
  private _adminService = inject(Admin)

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
      }
    })
  }

  updateStatus(id:number,state: string) {
    const token = sessionStorage.getItem('token')
    const header = new HttpHeaders({
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${token}`
    })

    const username = sessionStorage.getItem('username') || ''

    this._http.put(`${route}/medic/emergency-status/${id}`, { status: state }, { headers: header }).subscribe({
      next: (res: any) => {
        this.getEmergency(username)
      }
    })
  }

  updateComment(id:number,comment: string) {
    const token = sessionStorage.getItem('token')
    const header = new HttpHeaders({
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${token}`
    })

    const username = sessionStorage.getItem('username') || ''

    this._http.put(`${route}/medic/emergency-comment/${id}`, { comment: comment }, { headers: header }).subscribe({
      next: (res: any) => {
        this.getEmergency(username)
      }
    })
  }

}
