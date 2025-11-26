import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { GeneralModule } from '../../../../shared/general/general-module';
import { MaterialModuleModule } from '../../../../shared/material-module/material-module-module';
import { Admin } from '../../../../services/admin';
import { Alert } from '../../../../services/alert';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-emergencies',
  imports: [GeneralModule, MaterialModuleModule],
  templateUrl: './emergencies.html',
  styleUrl: './emergencies.scss',
})
export class Emergencies {



}
