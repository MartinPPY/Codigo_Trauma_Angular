import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  exports:[
    RouterLink,
    ReactiveFormsModule
  ]
})
export class GeneralModule { }
