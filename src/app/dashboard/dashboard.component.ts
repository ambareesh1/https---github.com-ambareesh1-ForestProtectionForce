import { Component } from '@angular/core';

interface Case {
  caseId: number;
  accusedName: string;
  division: string;
  date: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {
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
  constructor(){
    this.barChartData = {
      labels: ['2015', '2016', '2017', '2018',  '2019',  '2020'],
      datasets: [
        {
          label: 'Cases',
          data: [2000, 3500, 5000, 2000, 3000, 2800],
        
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
        labels: ['North', 'South', 'East', 'West'],
        datasets: [
          {
            data: [2000, 1500, 2500, 1000],
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
  this.tableData = {}


  setInterval(() => {
    const list = document.querySelector('.list-group') as HTMLElement;
    const firstItem = list.firstElementChild as HTMLElement;
    const newItem = firstItem.cloneNode(true) as HTMLElement;
    list.appendChild(newItem);
    firstItem.remove();
  }, 3000)
}
  

   randomCount = ()=>{
    return 4;
  }

}
