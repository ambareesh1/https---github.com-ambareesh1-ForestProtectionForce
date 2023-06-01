import { Component, Input } from '@angular/core';
import { ComplaintsRegistered } from '../Models/ComplaintsRegistered';
import { SeizureService } from '../services/seizure.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ManagedataService } from '../services/managedata.service';
import { SharedService } from '../services/shared.service';
import { catchError, from, last, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-complaints-registered',
  templateUrl: './complaints-registered.component.html',
  styleUrls: ['./complaints-registered.component.css']
})
export class ComplaintsRegisteredComponent {

  @Input()
  complaints: ComplaintsRegistered[] = [];
  @Input()
  districtId : any ;
  @Input()
  provinceId : any;
  cloned: {[s: string]: ComplaintsRegistered} = {};
  editing : boolean = false;

  constructor( private seizureService : SeizureService, private messageService : MessageService,
    private manageDataService : ManagedataService, private sharedServices : SharedService, private confirmationService : ConfirmationService ){
    }

    onRowEditInit = (form :ComplaintsRegistered) =>{
      this.cloned[form.id] = { ...form };
      this.editing = true;
    }
  
    onRowEditSave = (formA :ComplaintsRegistered) =>{
      console.log(formA);
  if (formA.id >= 0) {
           // delete this.clonedProducts[product.id];
           this.seizureService.updateComplaintsRegistered(formA.id, formA).pipe(
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
  
    onRowEditCancel = (formA :ComplaintsRegistered, index: number) =>{
      this.complaints[index] = this.cloned[formA.id];
      delete this.cloned[formA.id];
      this.editing = !this.editing;
    }
  
    AddARow = () =>{
      debugger;
        let id = 1;
        let month:number = 1;
        let year : number = 1;
       from(this.complaints)
        .pipe(last())
        .subscribe((lastRow) => {
         id = lastRow.sno+1;
         month = lastRow.month;
         year = lastRow.year;
         let seizure_Report: ComplaintsRegistered = {
           id: 0,
           sno: id,
           complaintNo: '',
           dateTimeOfReceipt: new Date(),
           sourceOfComplaint: '',
           briefDescription: '',
           complaintArea: '',
           cognizanceUnderSection: '',
           actionTaken: '',
           nameSignMunshiMoharir: '',
           provinceId: 0,
           districtId: 0,
           month: 0,
           year: 0,
           dateOfInsertion: new Date(),
           isActive: false,
           lastUpdatedOn: new Date(),
           updatedBy: ''
         };
        this.complaints.push(seizure_Report); 
        });
      }
  
      onRowDelete = (form: ComplaintsRegistered, id: any) => {
  
        return this.confirmationService.confirm({
          message: 'Are you sure you want to delete row ?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            form.isActive = false;
            this.seizureService.updateComplaintsRegistered(form.id, form).pipe(
              catchError((error) => {
                // Handle error
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update data' });
                return throwError(() => error);
              })
            ).subscribe((data) => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Row is Deleted' });
              this.complaints.pop();
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
