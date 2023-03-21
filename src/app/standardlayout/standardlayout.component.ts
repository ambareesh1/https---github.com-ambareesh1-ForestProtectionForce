import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-standardlayout',
  templateUrl: './standardlayout.component.html',
  styleUrls: ['./standardlayout.component.css']
})
export class StandardlayoutComponent {
  loading$: Observable<boolean>;

  constructor(private loadingService: SpinnerService) {
    this.loading$ = this.loadingService.loading$;
  }

  activeItem = 'dashboard'; // Set the initial active item to item1

  activateItem(item: string) {
    debugger;
    this.activeItem = item; // Set the clicked item as the active item
  }
}
 