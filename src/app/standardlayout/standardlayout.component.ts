import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-standardlayout',
  templateUrl: './standardlayout.component.html',
  styleUrls: ['./standardlayout.component.css']
})
export class StandardlayoutComponent {
  loading$: Observable<boolean>;
  activeItem:string = "dashboard"; // Set the initial active item to item1

  createAdminAuth : any;
  manageDataAuth : any;
  baselineAuth : any;
  offenderAuth : any;
  historySheetAuth : any;
  seizerAuth : any;
  disposedAuth :any;
  reports : any;

  constructor(private loadingService: SpinnerService, private router: Router, private sharedServices : SharedService) {
    let currentUrl = this.router.url.replace("/","");
    this.activateItem(currentUrl.indexOf('dashboard')>1 ? "dashboard" : currentUrl);
    this.loading$ = this.loadingService.loading$;
    
    //auhtorization
    this.createAdminAuth = this.sharedServices.createdUserAuth();
    this.manageDataAuth = this.sharedServices.manageDataAuth();
    this.baselineAuth = this.sharedServices.baselineAuth();
    this.offenderAuth = this.sharedServices.offenderAuth();
    this.seizerAuth = this.sharedServices.seizerAuth();
    this.historySheetAuth = this.sharedServices.historySheetAuth();
    this.disposedAuth = this.sharedServices.disposedAuth();
    this.reports = this.sharedServices.reportsAuth();
   
  }



  activateItem(item: string) {
    this.activeItem = item; // Set the clicked item as the active item
  }
}
 