import { DatePipe } from "@angular/common";
import { take, timer } from "rxjs";
import { Router } from '@angular/router';


export function changeColorOnStatus(status:any){
    if(status == "Open"){
      return 'status-proposal';
    }else if(status == "Approved"){
      return 'status-approved';
    }else{
      return 'status-rejected';
    }
  }
  
  export function dateFormate (onlyDate: any){
      const datePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(onlyDate, 'yyyy-MM-dd');
      return formattedDate;
  }

  export function stayAndNavigate(timeoutDuration: number, path: string, router: Router): void {
    timer(timeoutDuration)
      .pipe(take(1))
      .subscribe(() => {
        router.navigate([path]);
      });
  }
  
