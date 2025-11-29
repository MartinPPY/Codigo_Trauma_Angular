import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { route } from './route';
import { Alert } from './alert';
import { Emergency, EmergencyView, Medic } from '../admin/admin.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Admin {

  private _http = inject(HttpClient)
  private _alertService = inject(Alert)
  private _snackBar = inject(MatSnackBar)


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
        this.isLoading.set(false)
        this._alertService.alert('Error','Ha ocurrido un error al obtener los medicos!')
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
        this.isLoading.set(false)
        this._alertService.alert('Error','Ha ocurrido un error al obtener las emergencias')
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
        this._snackBar.open("Emergencia agregada!","Deshacer",{
          duration:3000,
          verticalPosition:'top'
        })
      },
      error: (err: any) => {
        this.isLoading.set(false)
        this._alertService.alert("Error","Ha ocurrido un error ingresar una emergencia!")
      }
    })
  }



}
