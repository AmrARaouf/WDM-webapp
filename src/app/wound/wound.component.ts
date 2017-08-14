import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { WoundService } from '@app/_services/wound.service'
import { PatientService } from '@app/_services/patient.service'
import { environment } from '@env/environment'

import { Wound } from '@models/Wound';
import { Patient } from '@models/Patient';

import { WOUND_POSITIONS, DOCUMENTATION_AFFECTED_TISSUE, DOCUMENTATION_COLOR,
  DOCUMENTATION_EXSUDAT, DOCUMENTATION_ASSESSMENT} from '@app/app.constants';

import * as jsPDF from 'jspdf'
import  * as qr from 'qrcode'

@Component({
  selector: 'app-wound',
  templateUrl: './wound.component.html',
  styles: []
})
export class WoundComponent implements OnInit {
  private WOUND_POSITIONS: object;
  private DOCUMENTATION_AFFECTED_TISSUE: object;
  private DOCUMENTATION_COLOR: object;
  private DOCUMENTATION_EXSUDAT: object;
  private DOCUMENTATION_ASSESSMENT: object;

  private lengthWidthChartData:Array<any> = [];
  private colorChartData:Array<any> = [];
  private affectedTissueChartData: Array<any> = [];
  private exsudatChartData: Array<any> = [];
  private assessmentChartData: Array<any> = [];
  
  private chartLabels:Array<any> = [];
  
  private lengthWidthChartOptions = {};
  private colorChartOptions = {};
  private affectedTissueChartOptions = {};
  private exsudatChartOptions = {};
  private assessmentChartOptions = {};

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
    this.WOUND_POSITIONS = WOUND_POSITIONS;
    this.DOCUMENTATION_AFFECTED_TISSUE = DOCUMENTATION_AFFECTED_TISSUE;
    this.DOCUMENTATION_COLOR = DOCUMENTATION_COLOR;
    this.DOCUMENTATION_EXSUDAT = DOCUMENTATION_EXSUDAT;
    this.DOCUMENTATION_ASSESSMENT = DOCUMENTATION_ASSESSMENT;

    this.route.params.subscribe( params => {
      var woundId: string = params['woundId'];
      var patientId: string = params['patientId'];

      this.patientService.getPatient(patientId).subscribe( (patient: Patient) => {
        this.patient = patient;
        this.isPatientDataAvailable = true;
      });

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

        this.lengthWidthChartOptions = this.populateChartOptionsNormalYAxis();
        this.colorChartOptions = this.populateChartOptions(this.DOCUMENTATION_COLOR);
        this.affectedTissueChartOptions = this.populateChartOptions(this.DOCUMENTATION_AFFECTED_TISSUE);
        this.exsudatChartOptions = this.populateChartOptions(this.DOCUMENTATION_EXSUDAT);
        this.assessmentChartOptions = this.populateChartOptions(this.DOCUMENTATION_ASSESSMENT);
        
        this.isWoundDataAvailable = true;
      } );
    });  
  }

  populateChartOptionsNormalYAxis(){
    var chartOptions = {
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
        }],
        yAxes: [{
          ticks: {
            callback: function(value, index, values) {
              return value*100 +" cm";
            }
          }
        }]
      }
    };
    return chartOptions;
  }

  populateChartOptions(map: object){
    var chartOptions = {
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
        }],
        yAxes: [{
          ticks: {
            callback: function(value, index, values) {
              if(map[value-1]){
                return map[value-1]['label']+'';
              }
            }
          }
        }]
      }
    };
    return chartOptions;
  }

  downloadQRCode() {
    var self = this;
    qr.toDataURL(this.wound._id, function (err, url) {
      var doc = new jsPDF();
      doc.setFontSize(25);
      doc.text(35, 25, `Patient/in: ${self.patient.firstName} ${self.patient.lastName}`);
      doc.text(35, 38, `Wundlokalisation: ${self.WOUND_POSITIONS[self.wound.position]}`);
      doc.addImage(url, 'JPEG', 15, 45, 180, 180);
      doc.save(`${self.patient.firstName}-${self.patient.lastName}-${self.wound.position}.pdf`);
    });
  }
}

