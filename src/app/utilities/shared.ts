import { DatePipe } from "@angular/common";


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