import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from '@app/app.component';
import { SearchComponent } from '@app/search/search.component';
import { PatientComponent } from '@app/patient/patient.component';
import { UploadComponent } from '@app/upload/upload.component';
import { PatientService } from '@app/patient.service';
import { WoundService } from '@app/wound.service';
import { StringToDatePipe } from '@app/string-to-date.pipe'

import { ROUTES } from '@app/routes';
import { QRCodeModule } from 'angular2-qrcode';
import { FileUploadModule } from 'ng2-file-upload';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PatientComponent,
    StringToDatePipe,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpModule,
    QRCodeModule,
    FileUploadModule,
    ChartsModule,
  ],
  providers: [
    PatientService,
    WoundService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
