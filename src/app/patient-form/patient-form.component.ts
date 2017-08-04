import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import {IMyDpOptions} from 'mydatepicker';


@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styles: []
})
export class PatientFormComponent implements OnInit {
  public patientForm: FormGroup;
  private myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.patientForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      address: ['', Validators.required],
      birthdate: [null, Validators.required],
      creationDate: [null, Validators.required],
      reference: [null, Validators.required]
    })
  }

  onSubmit() {
    var birthdateObject = this.patientForm.get('birthdate').value;
    var creationDateObject = this.patientForm.get('creationDate').value;
    this.patientForm.patchValue({birthdate: birthdateObject.jsdate});
    this.patientForm.patchValue({creationDate: creationDateObject.jsdate});
    console.log(this.patientForm.value);
  }

}
