import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshService } from '../services/refresh.service';
import { SharedService } from '../services/shared.service';
import { fadeInEffect } from '../animations/custom-animations';

@Component({
  selector: 'app-manage-parent',
  templateUrl: './manage-parent.component.html',
  styleUrls: ['./manage-parent.component.css'],
  providers: [RefreshService]
})
export class ManageParentComponent {

  isSuperAdmin : boolean = false;
  constructor(private refreshService: RefreshService, private sharedService:SharedService) {
    this.isSuperAdmin = sharedService.getUserDetails().username == 'superadmin';
  }

  refreshChildComponents(event:any) {
    if ((event.target as HTMLElement).classList.contains('p-accordion-header-link') || (event.target as HTMLElement).classList.contains('p-accordion-header-text')) {
      this.refreshService.emitRefreshEvent();
    }
  }
}




