import { Component, Input } from '@angular/core';
import { ForestOffenderModal } from '../Models/HebitualForestOffender';
import { SeizureService } from '../services/seizure.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ManagedataService } from '../services/managedata.service';
import { SharedService } from '../services/shared.service';
import { catchError, from, last, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-habitual-forest-offenders',
  templateUrl: './habitual-forest-offenders.component.html',
  styleUrls: ['./habitual-forest-offenders.component.css']
})
export class HabitualForestOffendersComponent {
  @Input()
  forestOffenders: any[] = [];
  @Input()
  districtId : any ;
  @Input()
  provinceId : any;
  cloned: {[s: string]: ForestOffenderModal} = {};
  editing : boolean = false;

  constructor( private seizureService : SeizureService, private messageService : MessageService,
    private manageDataService : ManagedataService, private sharedServices : SharedService, private confirmationService : ConfirmationService ){
    }

    onRowEditInit = (form :ForestOffenderModal) =>{
      this.cloned[form.Id] = { ...form };
      this.editing = true;
    }
  
    onRowEditSave = (formA :any) =>{
     debugger;
  if (formA.id >= 0) {
           // delete this.clonedProducts[product.id];
           this.seizureService.updateForestOffendersRegistered(formA.id, formA).pipe(
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
  
    onRowEditCancel = (formA :ForestOffenderModal, index: number) =>{
      this.forestOffenders[index] = this.cloned[formA.Id];
      delete this.cloned[formA.Id];
      this.editing = !this.editing;
    }
  
    AddARow = () =>{
      debugger;
        let id = 1;
        let month:number = 1;
        let year : number = 1;
       from(this.forestOffenders)
        .pipe(last())
        .subscribe((lastRow) => {
         id = lastRow.sno+1;
         month = lastRow.month;
         year = lastRow.year;
         let seizure_Report: any = {
          id: 0,
          sno: id,
          activeDormant : "",
          areaOfOperations :"",
          casesRegistered : 0,
          casesStatus : "",
          modusOperandi : "",
          nameOfForestOffender :"",
          provinceId: this.provinceId,
          districtId: this.districtId,
          month: new Date().getMonth() +1,
          year: new Date().getFullYear,
          dateOfInsertion: new Date(),
          isActive: true,
          lastUpdatedOn: new Date(),
          updatedBy: ''
         };
        this.forestOffenders.push(seizure_Report); 
        });
      }
  
      onRowDelete = (form: ForestOffenderModal, id: any) => {
  
        return this.confirmationService.confirm({
          message: 'Are you sure you want to delete row ?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            form.IsActive = false;
            this.seizureService.updateForestOffendersRegistered(form.Id, form).pipe(
              catchError((error) => {
                // Handle error
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update data' });
                return throwError(() => error);
              })
            ).subscribe((data) => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Row is Deleted' });
              this.forestOffenders.pop();
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
