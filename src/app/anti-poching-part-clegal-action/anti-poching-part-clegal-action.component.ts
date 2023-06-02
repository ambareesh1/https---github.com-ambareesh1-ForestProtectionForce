import { Component, Input } from '@angular/core';
import { SeizureService } from '../services/seizure.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ManagedataService } from '../services/managedata.service';
import { SharedService } from '../services/shared.service';
import { AntiPochingFormCModel } from '../Models/AntiPochingFormCModel';
import { catchError, from, last, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-anti-poching-part-clegal-action',
  templateUrl: './anti-poching-part-clegal-action.component.html',
  styleUrls: ['./anti-poching-part-clegal-action.component.css']
})
export class AntiPochingPartCLegalActionComponent {

  @Input()
  AntiPochingFormC: any[] = [];
  @Input()
  districtId : any ;
  @Input()
  provinceId : any;
  cloned: {[s: string]: AntiPochingFormCModel} = {};
  editing : boolean = false;

  constructor( private seizureService : SeizureService, private messageService : MessageService,
    private manageDataService : ManagedataService, private sharedServices : SharedService, private confirmationService : ConfirmationService ){
      
    }

    onRowEditInit = (form :AntiPochingFormCModel) =>{
      this.cloned[form.id] = { ...form };
      this.editing = true;
    }
  
    onRowEditSave = (formA :any) =>{
     debugger;
  if (formA.id >= 0) {
           // delete this.clonedProducts[product.id];
           this.seizureService.updateAntiPochingFormC(formA.id, formA).pipe(
            catchError((error: any) => {
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

    onRowDelete = (form: AntiPochingFormCModel, id: any) => {
  
      return this.confirmationService.confirm({
        message: 'Are you sure you want to delete row ?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          form.isActive = false;
          this.seizureService.updateAntiPochingFormC(form.id, form).pipe(
            catchError((error) => {
              // Handle error
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update data' });
              return throwError(() => error);
            })
          ).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Row is Deleted' });
            this.AntiPochingFormC.pop();
          })
        }
      });
  
    }
  

  convertToDate = (onlyDate:any)=>{
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(onlyDate, 'dd-MM-yyyy hh:mm');
    return formattedDate;
  }
  
    onRowEditCancel = (formA :AntiPochingFormCModel, index: number) =>{
      this.AntiPochingFormC[index] = this.cloned[formA.id];
      delete this.cloned[formA.id];
      this.editing = !this.editing;
    }

    AddARow = () =>{
      debugger;
        let id = 1;
        let month:number = 1;
        let year : number = 1;
       from(this.AntiPochingFormC)
        .pipe(last())
        .subscribe((lastRow) => {
         id = lastRow.sno+1;
         month = lastRow.month;
         year = lastRow.year;
         let seizure_Report: AntiPochingFormCModel = {
           id: 0,
           sno: id,
           provinceId: 0,
           districtId: 0,
           month: 0,
           year: 0,
           dateOfInsertion: new Date(),
           isActive: false,
           lastUpdatedOn: new Date(),
           updatedBy: '',
           fIRRegistered: '',
           noDate: '',
           details: ''
         };
        this.AntiPochingFormC.push(seizure_Report); 
        });
      }
  
}
