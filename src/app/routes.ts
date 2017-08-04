import { Routes } from '@angular/router';

import { SearchComponent } from '@app/search/search.component'
import { PatientComponent } from '@app/patient/patient.component'
import { PatientFormComponent } from '@app/patient-form/patient-form.component'
import { WoundComponent } from '@app/wound/wound.component'
import { WoundFormComponent } from '@app/wound-form/wound-form.component'
import { UploadComponent } from '@app/upload/upload.component'

export const ROUTES: Routes = [
  { path: '', component: SearchComponent },
  { path: 'patient/new', component: PatientFormComponent },
  { path: 'patient/:id', component: PatientComponent },
  { path: 'wound/new', component: WoundFormComponent },
  { path: 'wound/:id', component: WoundComponent },
  { path: 'upload', component: UploadComponent }
];
