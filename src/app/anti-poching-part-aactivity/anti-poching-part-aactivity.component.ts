import { Component, Input } from '@angular/core';
import { AntiPochingFormAModel } from '../Models/AntiPochingFormA';
import { SeizureService } from '../services/seizure.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ManagedataService } from '../services/managedata.service';
import { SharedService } from '../services/shared.service';
import { catchError, from, last, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-anti-poching-part-aactivity',
  templateUrl: './anti-poching-part-aactivity.component.html',
  styleUrls: ['./anti-poching-part-aactivity.component.css']
})
export class AntiPochingPartAActivityComponent {
  @Input()
  antiPouchingFormA: any[] = [];
  @Input()
  districtId : any ;
  @Input()
  provinceId : any;
  cloned: {[s: string]: AntiPochingFormAModel} = {};
  editing : boolean = false;

  constructor( private seizureService : SeizureService, private messageService : MessageService,
    private manageDataService : ManagedataService, private sharedServices : SharedService, private confirmationService : ConfirmationService ){
      console.log("--child--");
      console.log(this.antiPouchingFormA);
    }

    onRowEditInit = (form :AntiPochingFormAModel) =>{
      this.cloned[form.id] = { ...form };
      this.editing = true;
    }
  
    onRowEditSave = (formA :any) =>{
     
  if (formA.id >= 0) {
           // delete this.clonedProducts[product.id];
           this.seizureService.updateAntiPochingFormA(formA.id, formA).pipe(
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
  
    onRowEditCancel = (formA :AntiPochingFormAModel, index: number) =>{
      this.antiPouchingFormA[index] = this.cloned[formA.id];
      delete this.cloned[formA.id];
      this.editing = !this.editing;
    }
  
    AddARow = () =>{
      
        let id = 1;
        let month:number = 1;
        let year : number = 1;
       from(this.antiPouchingFormA)
        .pipe(last())
        .subscribe((lastRow) => {
         id = lastRow.sno+1;
         month = lastRow.month;
         year = lastRow.year;
         let seizure_Report: AntiPochingFormAModel = {
           activity: "",
           details: "",
           sno: 0,
           unit: 0,
           provinceId: this.provinceId,
           districtId: this.districtId,
           month: new Date().getMonth() + 1,
           year: new Date().getFullYear(),
           dateOfInsertion: new Date(),
           isActive: true,
           lastUpdatedOn: new Date(),
           updatedBy: '',
           id: id
         };
        this.antiPouchingFormA.push(seizure_Report); 
        });
      }
  
      onRowDelete = (form: AntiPochingFormAModel, id: any) => {
  
        return this.confirmationService.confirm({
          message: 'Are you sure you want to delete row ?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            form.isActive = false;
            this.seizureService.updateAntiPochingFormA(form.id, form).pipe(
              catchError((error) => {
                // Handle error
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update data' });
                return throwError(() => error);
              })
            ).subscribe((data) => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Row is Deleted' });
              this.antiPouchingFormA.pop();
            })
          }
        });
    
      }
    
  
    convertToDate = (onlyDate:any)=>{
      const datePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(onlyDate, 'dd-MM-yyyy hh:mm');
      return formattedDate;
    }
}
