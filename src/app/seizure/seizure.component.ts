import { Component, OnInit } from '@angular/core';
import { Seizures_Form_A } from '../Models/Seizures_Form_A';
import { SeizureService } from '../services/seizure.service';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import {dateFormate} from '../utilities/shared';
@Component({
  selector: 'app-seizure',
  templateUrl: './seizure.component.html',
  styleUrls: ['./seizure.component.css']
})


export class SeizureComponent implements OnInit {

  formsTypes:any = []
  formA : Seizures_Form_A[] = [];
  editing : boolean = false;
  clonedProducts: { [s: string]: Seizures_Form_A } = {};
  value: Date =  new Date();

  constructor( private seizureService : SeizureService, private messageService : MessageService ){
    this.formsTypes = [
      {name: 'Form A', code: 1},
      {name: 'Form B', code: 2},
      {name: 'Form C', code: 3}
  ];
  }

  sales: any[]=[];

    lastYearTotal: number=0;

    thisYearTotal: number=0;

    ngOnInit() {
       this.seizureService.getFormA().subscribe((data)=>{
        this.formA = data;
       })
    }

    calculateLastYearTotal() {
        let total = 0;
        for(let sale of this.sales) {
            total += sale.lastYearProfit;
        }

        this.lastYearTotal = total;
    }

    calculateThisYearTotal() {
        let total = 0;
        for(let sale of this.sales) {
            total += sale.thisYearProfit;
        }

        this.thisYearTotal = total;
    }

    onRowEditInit = (formA :Seizures_Form_A) =>{
      this.clonedProducts[formA.id] = { ...formA };
      this.editing = true;
    }

    onRowEditSave = (formA :Seizures_Form_A) =>{
      console.log(formA);
  if (formA.id > 0) {
           // delete this.clonedProducts[product.id];
           this.seizureService.updateFormA(formA.id, formA).pipe(
            catchError((error) => {
              // Handle error
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update data' });
              return throwError(() => error);
            })
          ).subscribe((data)=>{
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data is updated' });
           })
        } 
        this.editing = !this.editing;
    }
    onRowEditCancel = (formA :Seizures_Form_A, index: number) =>{
      this.formA[index] = this.clonedProducts[formA.id];
      delete this.clonedProducts[formA.id];
      this.editing = !this.editing;
    }
}

interface Forms {
  name: string,
  code: number
}
