// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

// npm modules
import { QRCodeModule } from 'angular2-qrcode';
import { FileUploadModule } from 'ng2-file-upload';
import { ChartsModule } from 'ng2-charts';
import { MyDatePickerModule } from 'mydatepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// routes
import { ROUTES } from '@app/routes';

// services
import { PatientService } from '@app/_services/patient.service';
import { WoundService } from '@app/_services/wound.service';
import { DocumentationService } from '@app/_services/documentation.service';

// components
import { AppComponent } from '@app/app.component';
import { SearchComponent } from '@app/search/search.component';
import { PatientComponent } from '@app/patient/patient.component';
import { UploadComponent } from '@app/upload/upload.component';
import { PatientFormComponent } from '@app/patient-form/patient-form.component';
import { WoundComponent } from '@app/wound/wound.component';
import { WoundFormComponent } from '@app/wound-form/wound-form.component';
import { DocumentationFormComponent } from './documentation-form/documentation-form.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PatientComponent,
    UploadComponent,
    PatientFormComponent,
    WoundComponent,
    WoundFormComponent,
    DocumentationFormComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    QRCodeModule,
    FileUploadModule,
    ChartsModule,
    MyDatePickerModule,
    Ng2SearchPipeModule
  ],
  providers: [
    PatientService,
    WoundService,
    DocumentationService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
