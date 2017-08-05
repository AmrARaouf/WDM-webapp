import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WoundService } from '@app/_services/wound.service'
import { environment } from '@env/environment'

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
      var woundId = params['id'];
      this.woundService.getWound(woundId).subscribe( wound => {this.wound = wound; console.log(wound)} );
    })
  }

}
