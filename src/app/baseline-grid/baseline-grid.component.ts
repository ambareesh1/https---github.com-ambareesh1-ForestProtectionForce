import { Component } from '@angular/core';
import { BaselineModel } from '../Models/BaselineModel';
import { BaselinedataService } from '../services/baselinedata.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-baseline-grid',
  templateUrl: './baseline-grid.component.html',
  styleUrls: ['./baseline-grid.component.css']
})
export class BaselineGridComponent {

  baselineData : BaselineModel[] = [];
  searchValue : any = null;
  rangeDates: Date[] = [];
  constructor(private baselineDataService : BaselinedataService, private router: Router){

  }
  ngOnInit(): void {
    this.getOffenderData();
  }

  getOffenderData = () =>{
     this.baselineDataService.getBaseline().subscribe((data)=>{
        this.baselineData = data;
        console.log(data);
     })
  }

  convertToDate = (onlyDate:any)=>{
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(onlyDate, 'yyyy-MM-dd');
    return formattedDate;
  }

  editBaseline = (baseline:BaselineModel) =>{

  }

  viewBaseline=(baseline:BaselineModel)=>{

  }

  addOffender=(baseline:BaselineModel)=>{
    this.router.navigate(['/offenderprofile']);
  }

  onDateRangeSelect=(event:any)=>{
    if(event[0] !== null && event[1] !== null){
      let startDate = new Date(event[0]);
      let endDate = new Date(event[1]);
      this.baselineData = this.baselineData = this.baselineData.filter(x => {
        const detectionDate = new Date(x.dateOfDetection);
        return detectionDate >= startDate &&
        detectionDate <= endDate;
      });
    }
  }

  navigateToBaselineProfile(){
    this.router.navigate(['/baselinedata'])
  }
  onClear = () =>{
    this.rangeDates = [];
    this.searchValue = "";
    this.getOffenderData();
  }

}

