import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PatientService } from '@app/_services/patient.service'

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styles: []
})
export class PatientComponent implements OnInit {

  private patient;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      var patientId = params['id'];
      this.patientService.getPatient(patientId).subscribe( patient => {this.patient = patient; console.log(patient.wounds);} );
    })
  }
}
