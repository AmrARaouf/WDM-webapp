import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";

import 'rxjs/Rx';
import { Observable } from "rxjs";

import { environment } from '@env/environment'
import { Patient } from '@models/Patient';

@Injectable()
export class PatientService {

  private apiUrl: string = environment.apiUrl;
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getPatients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/patient`, {headers: this.headers})
      .map( (response: Response) => response.json().patients )
      .catch(this.handleError);
  }

  getPatient(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/patient/${id}`, {headers: this.headers})
      .map( (response: Response) => response.json().patient )
      .catch(this.handleError);
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post(`${this.apiUrl}/patient`, JSON.stringify(patient), {headers: this.headers})
      .map( (response: Response) => response.json().patient )
      .catch(this.handleError);
  }

  handleError(error: Response): Observable<any> {
    return Observable.throw(error);
  }

}
