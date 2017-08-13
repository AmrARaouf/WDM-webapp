import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import {FileUploader} from 'ng2-file-upload';

import 'rxjs/Rx';
import { Observable } from "rxjs";

import { environment } from '@env/environment'
import { Wound } from '@models/Wound';

@Injectable()
export class WoundService {

  public apiUrl: string = environment.apiUrl;
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  public fileUploader:FileUploader = new FileUploader({url: this.apiUrl+'/wounds'});

  constructor(private http: Http) { }

  createWound(patientId: string, wound: Wound): Observable<Wound> {
    var payload = {
      "patientId": patientId,
      "wound": wound
    };
    return this.http.post(`${this.apiUrl}/wound`, JSON.stringify(payload), {headers: this.headers})
      .map( (response: Response) => response.json().wound )
      .catch(this.handleError);
  }

  editWound(woundId: string, wound: Wound) {
    var payload = {
      "wound": wound
    };
    return this.http.put(`${this.apiUrl}/wound/${woundId}`, JSON.stringify(payload), {headers: this.headers})
      .map( (response: Response) => response.json().wound )
      .catch(this.handleError);
  }

  getWound(woundId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/wound/${woundId}`, {headers: this.headers})
      .map( (response: Response) => response.json().wound )
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    return Observable.throw(error);
  }

}
