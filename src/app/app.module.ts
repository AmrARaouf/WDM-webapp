import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from '@app/app.component';
import { SearchComponent } from '@app/search/search.component';
import { PatientComponent } from '@app/patient/patient.component';

import { PatientService } from '@app/patient.service';
import { StringToDatePipe } from '@app/string-to-date.pipe'

import { ROUTES } from '@app/routes';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PatientComponent,
    StringToDatePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpModule,
  ],
  providers: [
    PatientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
