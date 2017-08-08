import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { Documentation } from '@models/Documentation';
import { DocumentationService } from '@app/_services/documentation.service'
import { DOCUMENTATION_AFFECTED_TISSUE, DOCUMENTATION_COLOR, DOCUMENTATION_EXSUDAT, 
    DOCUMENTATION_EDGE, DOCUMENTATION_SYMPTOPMS, DOCUMENTATION_ASSESSMENT} from '@app/app.constants';

@Component({
  selector: 'app-documentation-form',
  templateUrl: './documentation-form.component.html',
  styles: []
})
export class DocumentationFormComponent implements OnInit {

  private documentationForm: FormGroup;
  private documentation: Documentation;
  private DOCUMENTATION_AFFECTED_TISSUE: [string];
  private DOCUMENTATION_COLOR: [string];
  private DOCUMENTATION_EXSUDAT: [string];
  private DOCUMENTATION_EDGE: [string];
  private DOCUMENTATION_SYMPTOPMS: [string];
  private DOCUMENTATION_ASSESSMENT: [string];

  constructor(private formBuilder: FormBuilder,
            private documentationService: DocumentationService,
            private router: Router,
            private route: ActivatedRoute) { }

  ngOnInit() {
      this.DOCUMENTATION_AFFECTED_TISSUE = DOCUMENTATION_AFFECTED_TISSUE;
      this.DOCUMENTATION_COLOR = DOCUMENTATION_COLOR;
      this.DOCUMENTATION_EXSUDAT = DOCUMENTATION_EXSUDAT;
      this.DOCUMENTATION_EDGE = DOCUMENTATION_EDGE; 
      this.DOCUMENTATION_SYMPTOPMS = DOCUMENTATION_SYMPTOPMS;
      this.DOCUMENTATION_ASSESSMENT = DOCUMENTATION_ASSESSMENT;
    this.route.params.subscribe( params => {
      var documentationId = params['documentationId'];
      this.documentationService.getDocumentation(documentationId).subscribe( (documentation: Documentation) => {this.documentation = documentation;
          console.log("doc in form:" + documentation.affectedTissue);} );
    });    
    this.documentationForm = this.formBuilder.group({
      affectedTissue: [null, Validators.required],
      color: [null, Validators.required],
      exsudat: [null, Validators.required],
      edge: [null, Validators.required],
      symptoms: [null, Validators.required],
      assessment: [null, Validators.required],
      comment: ['', Validators.required]
    });
  }

  onSubmit() {
    this.route.params.subscribe( params => {
      var patientId = params['patientId'];
      var woundId = params['woundId'];
      var documentationId = params['documentationId'];
      var newDocumentation = <Documentation>this.documentationForm.value;
      console.log(newDocumentation);
      this.documentationService.editDocumentation(documentationId, newDocumentation).subscribe( (documentation: Documentation) => {
        this.router.navigate(['/patient', patientId, 'wound', woundId]);
      });
    })
  }


}
