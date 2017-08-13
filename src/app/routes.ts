import { Routes } from '@angular/router';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

import { SearchComponent } from '@app/search/search.component'
import { PatientComponent } from '@app/patient/patient.component'
import { PatientFormComponent } from '@app/patient-form/patient-form.component'
import { WoundComponent } from '@app/wound/wound.component'
import { WoundFormComponent } from '@app/wound-form/wound-form.component'
import { WoundEditComponent } from '@app/wound-edit/wound-edit.component'
import { UploadComponent } from '@app/upload/upload.component'
import { DocumentationFormComponent } from '@app/documentation-form/documentation-form.component'

export const ROUTES: Routes = [
  // Home page
  { path: '', component: SearchComponent },

  // Patient routes
  { path: 'patient/new', component: PatientFormComponent },    // create patient
  { path: 'patient/:patientId', component: PatientComponent }, // view patient

  // Wound routes
  { path: 'patient/:patientId/wound/new', component: WoundFormComponent },           // create wound
  { path: 'patient/:patientId/wound/:woundId/edit', component: WoundEditComponent }, // edit wound
  { path: 'patient/:patientId/wound/:woundId', component: WoundComponent },          // view wound

  // Documentation routes
  { path: 'patient/:patientId/wound/:woundId/documentation/:documentationId', component: DocumentationFormComponent },
  { path: 'upload', component: UploadComponent }
];
