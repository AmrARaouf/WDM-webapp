import { Component } from '@angular/core';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private breadcrumbService: BreadcrumbService) {
        //breadcrumbService.hideRoute('/patient');
        //breadcrumbService.addFriendlyNameForRouteRegex('/patient\/[a-f0-9]{24}', 'patient');
        
        //breadcrumbService.addFriendlyNameForRouteRegex('/patient\/[a-f0-9]{24}\/wound\/[a-f0-9]{24}', 'wound');
        //breadcrumbService.hideRouteRegex('/patient\/[a-f0-9]{24}\/wound');

        //breadcrumbService.addFriendlyNameForRouteRegex('/patient/[a-f0-9]{24}/wound/[a-f0-9]{24}/documentation', 'documentation');
        //breadcrumbService.hideRouteRegex('\/patient\/[a-zA-Z0-9]{24}\/wound\/[a-zA-Z0-9]{24}\/documentation\/');
    }
}