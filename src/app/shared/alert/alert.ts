import { Component, Inject } from '@angular/core';
import { MaterialModuleModule } from '../material-module/material-module-module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  imports: [MaterialModuleModule],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string },
    public dialogRef: MatDialogRef<Alert>
  ) {

  }


}
