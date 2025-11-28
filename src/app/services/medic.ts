import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { EmergencyView } from '../admin/admin.models';
import { route } from './route';

@Injectable({
  providedIn: 'root',
})
export class Medic {

  private _http = inject(HttpClient)

  emergency = signal<EmergencyView | null>(null)


  getEmergency(username: string) {
    const token = sessionStorage.getItem('token')
    const header = new HttpHeaders({
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${token}`
    })
    this._http.get(`${route}/medic/emergency/${username}`, { headers: header }).subscribe({
      next: (res: any) => {
        console.log(res)
      }
    })

  }

}
