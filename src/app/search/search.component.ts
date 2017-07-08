import { Component, OnInit } from '@angular/core';

import { PatientService } from '@app/patient.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  private patients;

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.patients = []
    this.patientService.getPatients().subscribe( patients => this.patients = patients )
  }

}
