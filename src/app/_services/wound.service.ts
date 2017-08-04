import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import {FileUploader} from 'ng2-file-upload';

import 'rxjs/Rx';
import { Observable } from "rxjs";

import { environment } from '@env/environment'

@Injectable()
export class WoundService {

  public apiUrl: string = environment.apiUrl;
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  public fileUploader:FileUploader = new FileUploader({url: this.apiUrl+'/wounds'});

  constructor(private http: Http) { }

  handleError(error: Response): Observable<any> {
    return Observable.throw(error);
  }

}
