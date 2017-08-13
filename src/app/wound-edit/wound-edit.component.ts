import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { CustomValidators } from 'ng2-validation';

import { Wound } from '@models/Wound';
import { WOUND_TYPES, WOUND_REASONS} from '@app/app.constants';
import { WoundService } from '@app/_services/wound.service'

@Component({
  selector: 'app-wound-edit',
  templateUrl: './wound-edit.component.html',
  styles: []
})
export class WoundEditComponent implements OnInit {
  editWoundForm: FormGroup;
  wound: Wound;
  patientId: string;

  private WOUND_TYPES: string[];
  private WOUND_REASONS: string[];

  constructor(private formBuilder: FormBuilder,
            private woundService: WoundService,
            private router: Router,
            private route: ActivatedRoute) { }

  ngOnInit() {
    this.initPageConstants();
    this.route.params.subscribe( params => {
      var woundId: string = params['woundId'];
      this.patientId = params['patientId'];
      this.woundService.getWound(woundId).subscribe( (wound: Wound) => {
        this.wound = wound;
        this.initDocumentationForm();
      });
    });
  }

  onSubmit() {
    var editWoundPayload = <Wound>this.editWoundForm.value;
    this.woundService.editWound(this.wound._id, editWoundPayload).subscribe( (wound: Wound) => {
      this.router.navigate(['/patient', this.patientId]);
    });
  }

  private initPageConstants() {
    this.WOUND_TYPES = WOUND_TYPES;
    this.WOUND_REASONS = WOUND_REASONS;
  }

  private initDocumentationForm() {
    this.editWoundForm = this.formBuilder.group({
      type: [this.wound.type, Validators.required],
      reason: [this.wound.reason, Validators.required],
      position: [this.wound.position, [Validators.required, Validators.pattern(/^\d+$/), CustomValidators.range([1,60])]],
    })
  }

}
