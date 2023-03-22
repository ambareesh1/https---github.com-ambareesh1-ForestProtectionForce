import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-standardlayout',
  templateUrl: './standardlayout.component.html',
  styleUrls: ['./standardlayout.component.css']
})
export class StandardlayoutComponent {
  loading$: Observable<boolean>;
  activeItem:string = "dashboard"; // Set the initial active item to item1
  constructor(private loadingService: SpinnerService, private router: Router) {
    let currentUrl = this.router.url.replace("/","");
    this.activateItem(currentUrl.indexOf('dashboard')>1 ? "dashboard" : currentUrl);
    this.loading$ = this.loadingService.loading$;
  }



  activateItem(item: string) {
    this.activeItem = item; // Set the clicked item as the active item
  }
}
 