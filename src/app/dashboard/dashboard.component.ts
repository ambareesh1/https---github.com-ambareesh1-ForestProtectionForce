import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaselineModel } from '../Models/BaselineModel';
import { BoxModel, Chart, Dashboard } from '../Models/Dashboard';
import { DashboardService } from '../services/dashboard.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaselineViewComponent } from '../baseline-view/baseline-view.component';
import { changeColorOnStatus } from '../utilities/shared';
import { fadeInEffect } from '../animations/custom-animations';
import { NavigationExtras, Router } from '@angular/router';

interface Case {
  caseId: number;
  accusedName: string;
  division: string;
  date: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations:[fadeInEffect]
})


export class DashboardComponent implements OnInit, OnDestroy {
  ref: DynamicDialogRef | undefined;
   intervalId: any= 0;
  barChartData: any;
  pieChartDate : any;
  tableData : any;
  cases: Case[] = [
    { caseId: 1, accusedName: 'John Doe', division: 'New York', date: new Date(2022, 2, 14, 10, 25) },
    { caseId: 2, accusedName: 'Jane Doe', division: 'Los Angeles', date: new Date(2022, 2, 15, 9, 35) },
    { caseId: 3, accusedName: 'Bob Smith', division: 'Chicago', date: new Date(2022, 2, 16, 14, 10) },
    { caseId: 4, accusedName: 'Bob Smith', division: 'Newyork', date: new Date(2022, 2, 16, 14, 10) },
    { caseId: 5, accusedName: 'David Willey', division: 'Dallos', date: new Date(2022, 2, 16, 14, 10) },
    { caseId: 6, accusedName: 'James Watt', division: 'Washington', date: new Date(2022, 2, 16, 14, 10) },
    { caseId: 7, accusedName: 'Merry Elizth', division: 'Columbus', date: new Date(2022, 2, 16, 14, 10) },
    { caseId: 8, accusedName: 'Doshman Groove', division: 'Newyork', date: new Date(2022, 2, 16, 14, 10) },
    { caseId: 9, accusedName: 'Ali Joe', division: 'Columbus', date: new Date(2022, 2, 16, 14, 10) },
    { caseId: 10, accusedName: 'Cary Matthew', division: 'Dallos', date: new Date(2022, 2, 16, 14, 10) }
  ]
  dashboard: any = null;
  boxModels: BoxModel[] = [];
  charts: Chart[] = [];
  baseline: BaselineModel[] = [];
  isDataLoaded: boolean = false;
  constructor( private dashboardService: DashboardService, public dialogService: DialogService, private router : Router){
    this.animateUpdates();
}

  ngOnInit(): void {

    const navigationExtras: NavigationExtras = {
      skipLocationChange: true
    };

    this.router.navigate([this.router.url], navigationExtras);
   
    this.dashboardService.getDashboardDetails().subscribe(data => {
      this.isDataLoaded = true;
        this.dashboard = data;
        this.boxModels = this.dashboard.boxModels || [];
        this.charts = this.dashboard.charts || [];
        this.baseline = this.dashboard.baseline || [];
        
        let bar = this.charts.filter(x=>x.name == "bar");
        let labels = bar.map(x=>x.xaxis);
        let yaxisData = bar.map(x=>x.yaxis);
  
        let pie = this.charts.filter(x=>x.name == "pie");
        let labelsPie = pie.map(x=>x.xaxis);
        let yaxisDataPie = pie.map(x=>x.yaxis);
        
        this.barChartData = {
          labels: labels,
          datasets: [
            {
              label: 'Cases',
              data: yaxisData,
            
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
               
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                
              ],
            },
            
          ],
         
          borderWidth: 1
        }
  
        this.pieChartDate = {
          labels:labelsPie,
          datasets: [
            {
              data: yaxisDataPie,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ]
            }
          ],
      
          borderWidth: 1
        }
      });
    
  
   
    this.tableData = {}
 
  }

  animateUpdates = () =>{
    this.intervalId =setInterval(() => {
      const list = document.querySelector('.live-updates') as HTMLElement;
      const firstItem = list.firstElementChild as HTMLElement;
      const newItem = firstItem.cloneNode(true) as HTMLElement;
      list.appendChild(newItem);
      firstItem.remove();
    }, 4000);
  }

  show(baseline:BaselineModel) {
    this.ref = this.dialogService.open(BaselineViewComponent, {
        header: 'Baseline Details',
        width: '60%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        baseZIndex: 10000,
        data: baseline.id
    });
}
  viewBaseline=(baseline:BaselineModel)=>{
    this.show(baseline);
  }
   randomCount = ()=>{
    return 4;
  }

  changeColorOnStatusOfDashboard = (status:any) =>{
    return changeColorOnStatus(status);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

}
