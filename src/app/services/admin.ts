import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { route } from './route';
import { Alert } from './alert';
import { Observable } from 'rxjs';
import { Medic } from '../admin/admin.models';

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



}
