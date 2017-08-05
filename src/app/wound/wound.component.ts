import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WoundService } from '@app/_services/wound.service'
import { environment } from '@env/environment'
import * as jsPDF from 'jspdf'
import  * as qr from 'qrcode'

@Component({
  selector: 'app-wound',
  templateUrl: './wound.component.html',
  styles: []
})
export class WoundComponent implements OnInit {

  private wound;
  private apiUrl: string = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private woundService: WoundService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      var woundId = params['woundId'];
      this.woundService.getWound(woundId).subscribe( wound => {this.wound = wound; console.log(wound)} );
    })
  }

  downloadQRCode() {
    var dataURI;
    qr.toDataURL(this.wound._id, function (err, url) {
      dataURI =  url;
    });

    var doc = new jsPDF();
    doc.text(35, 25, this.wound._id);
    doc.addImage(dataURI, 'JPEG', 15, 40, 180, 180);
    // Save the PDF
    doc.save(this.wound._id+'.pdf');
  }
}

