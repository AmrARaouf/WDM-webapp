import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { environment } from '@env/environment'
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

  private apiUrl: string = environment.apiUrl;
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
    this.loadPageConstants();
    this.documentationForm = this.formBuilder.group({
      affectedTissue: [null, Validators.required],
      color: [null, Validators.required],
      exsudat: ['1= Keines', Validators.required],
      edge: [null, Validators.required],
      symptoms: [null, Validators.required],
      assessment: [null, Validators.required],
      comment: ['', Validators.required]
    });

    this.route.params.subscribe( params => {
      var documentationId = params['documentationId'];
      this.documentationService.getDocumentation(documentationId).subscribe( (documentation: Documentation) => {
        console.log(documentation);
        this.documentation = documentation;
        this.documentationForm.patchValue({'affectedTissue':this.documentation.affectedTissue});

      });
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

  private loadPageConstants() {
    this.DOCUMENTATION_AFFECTED_TISSUE = DOCUMENTATION_AFFECTED_TISSUE;
    this.DOCUMENTATION_COLOR = DOCUMENTATION_COLOR;
    this.DOCUMENTATION_EXSUDAT = DOCUMENTATION_EXSUDAT;
    this.DOCUMENTATION_EDGE = DOCUMENTATION_EDGE; 
    this.DOCUMENTATION_SYMPTOPMS = DOCUMENTATION_SYMPTOPMS;
    this.DOCUMENTATION_ASSESSMENT = DOCUMENTATION_ASSESSMENT;
  }


}
