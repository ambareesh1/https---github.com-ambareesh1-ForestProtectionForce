import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  refreshEvent: EventEmitter<any> = new EventEmitter<any>();

  emitRefreshEvent() {
    this.refreshEvent.emit();
  }
  constructor() { }
}
