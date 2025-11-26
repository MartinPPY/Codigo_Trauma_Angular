import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatDialogContent,
    MatDialogActions,
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatPaginatorModule

  ],
  exports: [MatButtonModule, MatCardModule, MatInputModule,
    MatFormFieldModule, MatIconModule, MatStepperModule, MatProgressSpinnerModule, MatToolbarModule, MatDialogContent,
    MatDialogActions, MatSidenavModule, MatListModule, MatButtonToggleModule, MatSelectModule,MatPaginatorModule]
})
export class MaterialModuleModule { }
