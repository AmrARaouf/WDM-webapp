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
  private patientId: string ="";
  private woundId: string ="";

  private apiUrl: string = environment.apiUrl;
  private documentationForm: FormGroup;
  private documentation: Documentation;

  private DOCUMENTATION_AFFECTED_TISSUE: object[];
  private DOCUMENTATION_COLOR: object[];
  private DOCUMENTATION_EXSUDAT: object[];
  private DOCUMENTATION_EDGE: string[];
  private DOCUMENTATION_SYMPTOPMS: string[];
  private DOCUMENTATION_ASSESSMENT: object[];

  constructor(private formBuilder: FormBuilder,
            private documentationService: DocumentationService,
            private router: Router,
            private route: ActivatedRoute) { }

  ngOnInit() {
    this.initPageConstants();
    
    this.route.params.subscribe( params => {      
      this.patientId =params['patientId'];
      this.woundId = params['woundId'];

      var documentationId = params['documentationId'];
      this.documentationService.getDocumentation(documentationId).subscribe( (documentation: Documentation) => {
        this.documentation = documentation;
        console.log(documentation);
        this.initDocumentationForm();
      });
    });    
  }

  checkEdge(event, edge: string) {
    var selectedEdges = this.documentationForm.controls['edges'].value;
    if (event.target.checked) {
      selectedEdges.push(edge);
    } else {
      selectedEdges = selectedEdges.filter( currentSymptom => currentSymptom !== edge );
    }
    this.documentationForm.controls['edges'].setValue(selectedEdges);
  }

  checkSymptom(event, symptom: string) {
    var selectedSymptoms = this.documentationForm.controls['symptoms'].value;
    if (event.target.checked) {
      selectedSymptoms.push(symptom);
    } else {
      selectedSymptoms = selectedSymptoms.filter( currentSymptom => currentSymptom !== symptom );
    }
    this.documentationForm.controls['symptoms'].setValue(selectedSymptoms);
  }

  onSubmit() {
    this.route.params.subscribe( params => {
      var patientId = params['patientId'];
      var woundId = params['woundId'];
      var documentationId = params['documentationId'];
      var newDocumentation = <Documentation>this.documentationForm.value;
      this.documentationService.editDocumentation(documentationId, newDocumentation).subscribe( (documentation: Documentation) => {
        this.router.navigate(['/patient', patientId, 'wound', woundId]);
      });
    })
  }

  private initPageConstants() {
    this.DOCUMENTATION_AFFECTED_TISSUE = DOCUMENTATION_AFFECTED_TISSUE;
    this.DOCUMENTATION_COLOR = DOCUMENTATION_COLOR;
    this.DOCUMENTATION_EXSUDAT = DOCUMENTATION_EXSUDAT;
    this.DOCUMENTATION_EDGE = DOCUMENTATION_EDGE; 
    this.DOCUMENTATION_SYMPTOPMS = DOCUMENTATION_SYMPTOPMS;
    this.DOCUMENTATION_ASSESSMENT = DOCUMENTATION_ASSESSMENT;
  }

  private initDocumentationForm() {
    this.documentationForm = this.formBuilder.group({
      affectedTissue: [this.documentation.affectedTissue || null, Validators.required],
      color: [this.documentation.color || null, Validators.required],
      exsudat: [this.documentation.exsudat || null, Validators.required],
      edges: [this.documentation.edges || []],
      symptoms: [this.documentation.symptoms || []],
      assessment: [this.documentation.assessment || null, Validators.required],
      comment: [this.documentation.comment || ""]
    });
  }

}
