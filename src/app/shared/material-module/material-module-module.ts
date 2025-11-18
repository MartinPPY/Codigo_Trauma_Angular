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
    MatDialogActions

  ],
  exports: [MatButtonModule, MatCardModule, MatInputModule,
    MatFormFieldModule, MatIconModule, MatStepperModule, MatProgressSpinnerModule, MatToolbarModule, MatDialogContent,
    MatDialogActions]
})
export class MaterialModuleModule { }
