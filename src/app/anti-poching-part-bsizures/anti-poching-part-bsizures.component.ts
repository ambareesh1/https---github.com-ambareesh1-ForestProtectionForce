import { Component, Input } from '@angular/core';
import { AntiPochingFormBModel } from '../Models/AntiPochingFormBModel';
import { SeizureService } from '../services/seizure.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ManagedataService } from '../services/managedata.service';
import { SharedService } from '../services/shared.service';
import { AntiPochingFormAModel } from '../Models/AntiPochingFormA';
import { catchError, from, throwError } from 'rxjs';

@Component({
  selector: 'app-anti-poching-part-bsizures',
  templateUrl: './anti-poching-part-bsizures.component.html',
  styleUrls: ['./anti-poching-part-bsizures.component.css']
})
export class AntiPochingPartBSizuresComponent {
  @Input()
  antiPouchingFormB: any[] = [];
  @Input()
  districtId : any ;
  @Input()
  provinceId : any;
  cloned: {[s: string]: AntiPochingFormBModel} = {};
  editing : boolean = false;

  constructor( private seizureService : SeizureService, private messageService : MessageService,
    private manageDataService : ManagedataService, private sharedServices : SharedService, private confirmationService : ConfirmationService ){
      console.log("--child--");
      console.log(this.antiPouchingFormB);
    }

    onRowEditInit = (form :AntiPochingFormBModel) =>{
      this.cloned[form.id] = { ...form };
      this.editing = true;
    }
  
    onRowEditSave = (formA :any) =>{
     
  if (formA.id >= 0) {
           // delete this.clonedProducts[product.id];
           this.seizureService.updateAntiPochingFormB(formA.id, formA).pipe(
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
  
    onRowEditCancel = (formA :AntiPochingFormAModel, index: number) =>{
      this.antiPouchingFormB[index] = this.cloned[formA.id];
      delete this.cloned[formA.id];
      this.editing = !this.editing;
    }
  
}
