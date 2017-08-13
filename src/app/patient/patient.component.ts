import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PatientService } from '@app/_services/patient.service'

import { Wound } from '@models/Wound';
import { Patient } from '@models/Patient';

import { WOUND_POSITIONS} from '@app/app.constants';

import * as jsPDF from 'jspdf'
import  * as qr from 'qrcode'

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styles: []
})
export class PatientComponent implements OnInit {

  private patient;
  private WOUND_POSITIONS: object;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService) { }

  ngOnInit() {
    this.WOUND_POSITIONS = WOUND_POSITIONS;
    this.route.params.subscribe( params => {
      var patientId = params['patientId'];
      this.patientService.getPatient(patientId).subscribe( patient => this.patient = patient );
    })
  }
  downloadAllQRCode() {
    var self = this;
    var doc = new jsPDF();
    var len = this.patient.wounds.length;
    this.patient.wounds.forEach((wound, index) => {
      qr.toDataURL(wound._id, function (err, url) {        
        doc.setFontSize(25);
        doc.text(35, 25, `Patient/in: ${self.patient.firstName} ${self.patient.lastName}`);
        doc.text(35, 38, `Wundlokalisation: ${wound.position}`);
        doc.addImage(url, 'JPEG', 15, 45, 180, 180);
        if(index+1 != len){
          doc.addPage();
        }
      });
    });
    doc.save(`${self.patient.firstName}-${self.patient.lastName}-alle-Wunde.pdf`);
  }
}
