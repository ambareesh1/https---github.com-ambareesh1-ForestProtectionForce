import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  setLoading(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }
}
