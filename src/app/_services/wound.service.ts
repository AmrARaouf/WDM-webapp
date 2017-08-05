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

  createWound(patientId: number, wound: Wound): Observable<Wound> {
    var payload = {
      "patientId": patientId,
      "wound": wound
    };
    return this.http.post(`${this.apiUrl}/wound`, JSON.stringify(payload), {headers: this.headers})
      .map( (response: Response) => response.json().wound )
      .catch(this.handleError);
  }

  handleError(error: Response): Observable<any> {
    return Observable.throw(error);
  }

  getWound(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/wound/${id}`, {headers: this.headers})
      .map( (response: Response) => response.json().wound )
      .catch(this.handleError);
  }

}
