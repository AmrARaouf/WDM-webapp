import { Component, OnInit, Input } from '@angular/core';

import { DocumentationService } from '@app/_services/documentation.service'
import { environment } from '@env/environment'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styles: []
})
export class NotificationsComponent implements OnInit {

  @Input() patientLink: string;
  @Input() woundLink: string;
  @Input() pageName: string;

  private apiUrl: string = environment.apiUrl;
  private notifications;

  constructor(private documentationService: DocumentationService) { }

  ngOnInit() {
    this.notifications = []
    this.documentationService.getDocumentationNotifications().subscribe( notifications => this.notifications = notifications )
  }

}
