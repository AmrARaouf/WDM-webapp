import { Routes } from '@angular/router';

import { SearchComponent } from './search/search.component'
import { PatientComponent } from './patient/patient.component'

export const ROUTES: Routes = [
  { path: '', component: SearchComponent },
  { path: 'patient/:id', component: PatientComponent }
];
