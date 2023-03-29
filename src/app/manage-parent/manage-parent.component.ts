import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshService } from '../services/refresh.service';

@Component({
  selector: 'app-manage-parent',
  templateUrl: './manage-parent.component.html',
  styleUrls: ['./manage-parent.component.css'],
  providers: [RefreshService]
})
export class ManageParentComponent {

  constructor(private refreshService: RefreshService) {}

  refreshChildComponents(event:any) {
    if ((event.target as HTMLElement).classList.contains('p-accordion-header-link') || (event.target as HTMLElement).classList.contains('p-accordion-header-text')) {
      this.refreshService.emitRefreshEvent();
    }
  }
}




