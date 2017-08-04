import { Component, OnInit } from '@angular/core';
import { WoundService } from '@app/_services/wound.service';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html'
})

export class UploadComponent {

  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  public uploader:FileUploader;

 
  constructor(private woundService: WoundService) {
    console.log(woundService.apiUrl);
    this.uploader = woundService.fileUploader;
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}