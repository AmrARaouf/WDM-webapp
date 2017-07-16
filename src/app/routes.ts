import { Routes } from '@angular/router';

import { SearchComponent } from '@app/search/search.component'
import { PatientComponent } from '@app/patient/patient.component'
import { UploadComponent } from '@app/upload/upload.component'

export const ROUTES: Routes = [
  { path: '', component: SearchComponent },
  { path: 'patient/:id', component: PatientComponent },
  { path: 'upload', component: UploadComponent }
];
