

export function changeColorOnStatus(status:any){
    if(status == "Open"){
      return 'status-proposal';
    }else if(status == "Approved"){
      return 'status-approved';
    }else{
      return 'status-rejected';
    }
  }
  