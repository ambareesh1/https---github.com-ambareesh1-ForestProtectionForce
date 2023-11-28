import { Component, Input } from '@angular/core';
import { ForestFire } from '../Models/ForestFire';
import { SeizureService } from '../services/seizure.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ManagedataService } from '../services/managedata.service';
import { SharedService } from '../services/shared.service';
import { catchError, from, last, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-forest-fire-seizure',
  templateUrl: './forest-fire-seizure.component.html',
  styleUrls: ['./forest-fire-seizure.component.css']
})
export class ForestFireSeizureComponent {
  @Input()
  forestFire : ForestFire[] = [];
  @Input()
  districtId : any ;
  @Input()
  provinceId : any;
  @Input()
  districtName:any;

  cloned: {[s: string]: ForestFire} = {};
  editing : boolean = false;

  constructor( private seizureService : SeizureService, private messageService : MessageService,
    private manageDataService : ManagedataService, private sharedServices : SharedService, private confirmationService : ConfirmationService ){
    }

  onRowEditInit = (form :ForestFire) =>{
    this.cloned[form.id] = { ...form };
    this.editing = true;
  }

  onRowEditSave = (formA :ForestFire) =>{
    console.log(formA);
if (formA.id >= 0) {
         // delete this.clonedProducts[product.id];
         this.seizureService.updateForestFire(formA.id, formA).pipe(
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

  onRowEditCancel = (formA :ForestFire, index: number) =>{
    this.forestFire[index] = this.cloned[formA.id];
    delete this.cloned[formA.id];
    this.editing = !this.editing;
  }

  AddARow = () =>{
    
      let id = 1;
      let month:number = 1;
      let year : number = 1;
     from(this.forestFire)
      .pipe(last())
      .subscribe((lastRow) => {
        debugger;
       id = lastRow.sno+1;
       month = lastRow.month;
       year = lastRow.year;
       let seizure_Report: ForestFire = {
         id: 0,
         sno: id,
         province_id: this.provinceId,
         district_id: this.districtId,
         gamma_unit_name: this.districtName,
         ob_total_cases: lastRow.ob_total_cases,
         forest_division_name: '',
         fire_spot: '',
         forest_damage_area: 0,
         forest_crop_damaged: '',
         fire_datetime: new Date(),
         fpf_personnel_name: '',
         total_fire_cases: id,
         month: month,
         year: year,
         date_of_insertion: new Date(),
         is_active: true,
         last_updated_on: new Date()
       };
      this.forestFire.push(seizure_Report); 
      });
    }

    onRowDelete = (form: ForestFire, id: any) => {

      return this.confirmationService.confirm({
        message: 'Are you sure you want to delete row ?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          form.is_active = false;
          this.seizureService.updateForestFire(form.id, form).pipe(
            catchError((error) => {
              // Handle error
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update data' });
              return throwError(() => error);
            })
          ).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Row is Deleted' });
            this.forestFire.pop();
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
