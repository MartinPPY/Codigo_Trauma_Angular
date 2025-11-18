import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alert as AlertComponent } from '../shared/alert/alert';

@Injectable({
  providedIn: 'root',
})
export class Alert {

  constructor(
    private dialog: MatDialog
  ) {

  }

  alert(title: string, message: string) {

    return this.dialog.open(AlertComponent, {
      data: { title, message },
      disableClose: true
    })

  }


}
