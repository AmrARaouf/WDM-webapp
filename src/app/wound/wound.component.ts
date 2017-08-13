import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { WoundService } from '@app/_services/wound.service'
import { PatientService } from '@app/_services/patient.service'
import { environment } from '@env/environment'

import { Wound } from '@models/Wound';
import { Patient } from '@models/Patient';

import * as jsPDF from 'jspdf'
import  * as qr from 'qrcode'

@Component({
  selector: 'app-wound',
  templateUrl: './wound.component.html',
  styles: []
})
export class WoundComponent implements OnInit {
  private lengthWidthChartData:Array<any> = [];
  private colorChartData:Array<any> = [];
  private affectedTissueChartData: Array<any> = [];
  private exsudatChartData: Array<any> = [];
  private assessmentChartData: Array<any> = [];
  private chartLabels:Array<any> = [];
  private chartOptions = {
    elements: {
        line: {
            tension: 0
        }
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          format: 'll',
          unit: 'day',
          displayFormats: {
            'day': 'll', 
          }
        }
      }]
    }
  };
  private isWoundDataAvailable:boolean = false;
  private isPatientDataAvailable: boolean = false;
  private wound: Wound;
  private patient: Patient;
  private apiUrl: string = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private woundService: WoundService,
    private patientService: PatientService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      var woundId = params['woundId'];
      var patientId = params['patientId'];
      this.patientService.getPatient(patientId).subscribe( (patient: Patient) => {this.patient = patient; this.isPatientDataAvailable = true;} );
      this.woundService.getWound(woundId).subscribe( (wound: Wound) => {
        this.wound = wound;
        var length = [];
        var width = [];
        var color = [];
        var assessment = [];
        var exsudat = [];
        var affectedTissue = [];
        for (let doc of this.wound.documentations) {
          length.push(doc.length);
          width.push(doc.width);
          color.push(doc.color);
          assessment.push(doc.assessment);
          exsudat.push(doc.exsudat);
          affectedTissue.push(doc.affectedTissue)

          this.chartLabels.push(this.datePipe.transform(doc.date, 'medium'));
        }
        this.assessmentChartData.push({data:assessment, label: 'Wundbeurteilung'});
        this.exsudatChartData.push({data:exsudat, label: 'Wundexsudat'});
        this.affectedTissueChartData.push({data:affectedTissue, label: 'Betroffene Gewebsstruktu'});
        this.colorChartData.push({data:color, label: 'Wundzustand'});
        this.lengthWidthChartData.push({data: length, label: 'Länge', fill: false});
        this.lengthWidthChartData.push({data: width, label: 'Breite', fill: false});
        this.isWoundDataAvailable = true;
      } );
    })
  }

  downloadQRCode() {
    var self = this;
    qr.toDataURL(this.wound._id, function (err, url) {
      var doc = new jsPDF();
      doc.setFontSize(25);
      doc.text(35, 25, `Patient/in: ${self.patient.firstName} ${self.patient.lastName}`);
      doc.text(35, 38, `Wundlokalisation: ${self.wound.position}`);
      doc.addImage(url, 'JPEG', 15, 45, 180, 180);
      doc.save(`${self.patient.firstName}-${self.patient.lastName}-${self.wound.position}.pdf`);
    });
  }
}

