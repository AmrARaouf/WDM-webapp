import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";

import 'rxjs/Rx';
import { Observable } from "rxjs";

import { environment } from '@env/environment'
import { Documentation } from '@models/Documentation';

@Injectable()
export class DocumentationService {

  public apiUrl: string = environment.apiUrl;
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  editDocumentation(documentationId: string, documentation: Documentation): Observable<Documentation> {
    var payload = {
      "documentation": documentation
    };
    return this.http.post(`${this.apiUrl}/documentation/${documentationId}`, JSON.stringify(payload), {headers: this.headers})
      .map( (response: Response) => response.json().documentation )
      .catch(this.handleError);
  }

  getDocumentation(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/documentation/${id}`, {headers: this.headers})
      .map( (response: Response) => response.json().documentation )
      .catch(this.handleError);
  }

  getDocumentationNotifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notifications`, {headers: this.headers})
      .map( (response: Response) => response.json().notifications )
      .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    return Observable.throw(error);
  }


}
