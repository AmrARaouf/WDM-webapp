import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { CustomValidators } from 'ng2-validation';

import { Wound } from '@models/Wound';
import { WOUND_TYPES, WOUND_REASONS} from '@app/app.constants';
import { WoundService } from '@app/_services/wound.service'

@Component({
  selector: 'app-wound-form',
  templateUrl: './wound-form.component.html',
  styles: []
})
export class WoundFormComponent implements OnInit {
  patientId: string;

  private woundForm: FormGroup;
  private WOUND_TYPES: string[];
  private WOUND_REASONS: string[];

  constructor(private formBuilder: FormBuilder,
            private woundService: WoundService,
            private router: Router,
            private route: ActivatedRoute) { }

  ngOnInit() {
    this.initPageConstants();
    this.initDocumentationForm();
    this.route.params.subscribe( params => { 
      this.patientId = params['patientId'];
    });
  }

  specialTypeKeypress(event) {
    this.woundForm.controls['type'].setValue(event.target.value);
  }

  onSubmit() {
    // console.log(this.woundForm.value);
    var newWound = <Wound>this.woundForm.value;
    console.log(this.patientId, newWound);
    this.woundService.createWound(this.patientId, newWound).subscribe( (wound: Wound) => {
      this.router.navigate(['/patient', this.patientId]);
    });
  }

  private initPageConstants() {
    this.WOUND_TYPES = WOUND_TYPES;
    this.WOUND_REASONS = WOUND_REASONS;
  }

  private initDocumentationForm() {
    this.woundForm = this.formBuilder.group({
      type: ['', Validators.required],
      reason: ['', Validators.required],
      position: [null, [Validators.required, Validators.pattern(/^\d+$/), CustomValidators.range([1,60])]],
    })
  }

}
