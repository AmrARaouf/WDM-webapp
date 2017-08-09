import { Routes } from '@angular/router';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

import { SearchComponent } from '@app/search/search.component'
import { PatientComponent } from '@app/patient/patient.component'
import { PatientFormComponent } from '@app/patient-form/patient-form.component'
import { WoundComponent } from '@app/wound/wound.component'
import { WoundFormComponent } from '@app/wound-form/wound-form.component'
import { UploadComponent } from '@app/upload/upload.component'
import { DocumentationFormComponent } from '@app/documentation-form/documentation-form.component'

export const ROUTES: Routes = [
  { path: '', component: SearchComponent },
  { path: 'patient/new', component: PatientFormComponent },
  { path: 'patient/:patientId', component: PatientComponent },
  { path: 'patient/:patientId/wound/new', component: WoundFormComponent },
  { path: 'patient/:patientId/wound/:woundId', component: WoundComponent },
  { path: 'patient/:patientId/wound/:woundId/documentation/:documentationId', component: DocumentationFormComponent },
  { path: 'upload', component: UploadComponent }
];
