import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { route } from './route';
import { Alert } from './alert';
import { Observable } from 'rxjs';
import { Emergency, EmergencyView, Medic } from '../admin/admin.models';

@Injectable({
  providedIn: 'root',
})
export class Admin {

  private _http = inject(HttpClient)
  private _alertService = inject(Alert)


  medics = signal<Medic[]>([])
  isLoading = signal<boolean>(false)
  error = signal<string | null>(null)

  medicsActive = computed(() => this.medics().filter(m => m.availability === true).length)

  emergencies = signal<EmergencyView[]>([])

  getAllMedics() {
    this.isLoading.set(true)
    const token = sessionStorage.getItem('token')
    const header = new HttpHeaders({
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${token}`
    })
    this._http.get<Medic[]>(`${route}/admin/medics`, { headers: header }).subscribe({
      next: (res: Medic[]) => {
        this.medics.set(res)
        this.isLoading.set(false)
      },
      error: (err: any) => {
        console.error(err)
        this.isLoading.set(false)
      }
    })
  }

  getEmergencies() {
    this.isLoading.set(true)
    const token = sessionStorage.getItem('token')
    const header = new HttpHeaders({
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${token}`
    })
    this._http.get<EmergencyView[]>(`${route}/admin/emergencies`, { headers: header }).subscribe({
      next: (res: EmergencyView[]) => {
        this.emergencies.set(res)
        this.isLoading.set(false)
      },
      error: (err: any) => {
        console.error(err)
        this.isLoading.set(false)
      }
    })
  }

  addEmergency(emergency: Emergency) {
    this.isLoading.set(true)
    const token = sessionStorage.getItem('token')
    const header = new HttpHeaders({
      'Content-Type': 'Application/json',
      'Authorization': `Bearer ${token}`
    })
    this._http.post(`${route}/admin/emergencies`, emergency, { headers: header }).subscribe({
      next: (res: any) => {
        this.getEmergencies()
        this.getAllMedics()
        
      },
      error: (err: any) => {
        console.error(err)
      }
    })


  }



}
