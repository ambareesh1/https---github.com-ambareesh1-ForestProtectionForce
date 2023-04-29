import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUser } from '../Models/AdmimUsersModel';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ManagedataService } from '../services/managedata.service';
import { Circle, CircleView, District, Division, Province } from '../Models/ManageDataModels';
import { RefreshService } from '../services/refresh.service';
import { divisionValidator } from '../custom-validators/customvalidators';
import { Observable, forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-manage-division',
  templateUrl: './manage-division.component.html',
  styleUrls: ['./manage-division.component.css']
})
export class ManageDivisionComponent {


  productDialog: boolean = false;
  Delete : any = "Delete";
  btnTitle : any = "Add";
  divisionDataOnEdit : Division = {} as Division;
  division : Division[] = [];
  districtData : District[]=[];
  provinceData : Province[]=[];
  circleData : CircleView[] =[];
  submitted: boolean = true;
  search : any = "";
  isDivisionConf : boolean = true;
  isDataLoaded : boolean = false;
 formDivision: FormGroup =new FormGroup({});
 constructor(private manageDataService: ManagedataService,
    private messageService: MessageService,
     private confirmationService: ConfirmationService,
      private fb: FormBuilder, private refreshService: RefreshService) { 
      
     }

     ngOnInit() {
      const sources$: Observable<any>[] = [
        this.getDivisionData(),
       // this.getDistrictData(),
      //  this.getCircleData(),
        this.getProvinceData()
      ];
    
      forkJoin(sources$).subscribe((data: any[]) => {
        debugger;
        this.division = data[0];
       // this.districtData = data[1];
       // this.circleData = data[2];
        data[1].unshift({
        id: -1,
        name: 'Select',
        districtId: -1,
        isActive: false,
        circleId: 0,
        provinceId: 0
      });
        this.provinceData = data[1];
        this.isDataLoaded = true;
        this.initForm();
      });
    }

 initForm(division: Division = {} as Division){
  debugger;
   this.formDivision = this.fb.group({
    divisionName: [ ''|| division.name, Validators.required,[divisionValidator(this.manageDataService)]], //, 
    district : ['' || division.districtId],
    province : ['' || division.provinceId],
    circle : ['' || division.circleId]
   });
}

getDivisionData(): Observable<any> {
  return this.manageDataService.getDivison();
}

refreshDivisionData = () =>{
  this.getDivisionData().subscribe((x)=>{
    this.division = x;
  })
}

getDistrictData(): Observable<any> {
  return this.manageDataService.getDistrict();
}

getProvinceData(): Observable<any> {
  return this.manageDataService.getProvince().pipe(
    tap((data) => {
      this.provinceData = data;
    })
  );
}

 getCircleData(): Observable<any> {
  return this.manageDataService.getCircle();
 }

onSubmitDivision() {
  this.btnTitle = "Add";
  if(Object.keys(this.divisionDataOnEdit).length === 0){
   let divisionData: Division = {
     id: 0,
     name: this.formDivision.value.divisionName,
     isActive: true,
     districtId: this.formDivision.value.district,
     circleId: this.formDivision.value.circle,
     provinceId: this.formDivision.value.province
   };
  
   this.manageDataService.createDivison(divisionData).subscribe((x)=>{
    if(x){
     let divisionAddmsg = "Forest Range "+this.formDivision.value.divisionName+ " saved"
     this.messageService.add({severity:'success', summary: 'Successful', detail: divisionAddmsg, life: 5000});
     this.refreshDivisionData();
     this.formDivision.reset();
    }
   })
  }else{
    this.divisionDataOnEdit.name = this.formDivision.value.divisionName;
    this.manageDataService.updateDivision(this.divisionDataOnEdit.id, this.divisionDataOnEdit).subscribe((x)=>{
     
       let provinceAddmsg = "Forest Range "+this.formDivision.value.divisionName+ " updated"
       this.messageService.add({severity:'success', summary: 'Successful', detail: provinceAddmsg, life: 5000});
       this.formDivision.reset();
       this.refreshDivisionData();
      this.divisionDataOnEdit = {} as Division;
     })
   }
}

 editDivision(division: Division) {
  this.divisionDataOnEdit = division;
  this.btnTitle = "Update";
    this.initForm(division);
     this.productDialog = true;
 }

 deleteDivision(division: Division) {
         if(this.isDivisionConf){
         this.confirmationService.confirm({
           key: 'delete-division-' + division.id,
         
           message: 'Are you sure you want to delete ' + division.name + '?',
           header: 'Confirm',
           icon: 'pi pi-exclamation-triangle',
           accept: () => {
             this.manageDataService.deleteDivison(division.id).subscribe((x)=>{
               if(x==null){
               this.division = this.division.filter(val => val.id !== division.id);
                let divisionDeltedItem = "division "+division.name+" is Deleted";
               this.messageService.add({severity:'success', summary: 'Successful', detail: divisionDeltedItem, life: 3000});
               
           }
         })
       }
       });
      }
 }

 hideDialog() {
     this.productDialog = false;
     this.submitted = false;
 }
 onReset(){
  this.formDivision.reset();
  this.btnTitle = "Add";
}

 onChangeProvince = (event:any)=>{
  this.manageDataService.getCircle().subscribe((data)=>{
    debugger;
    data= data.filter(x=>x.provinceId == event.value);
    data.unshift({
      id: -1, name: 'Select',
      isActive: false,
      province: { id: -1, name: "", isActive: true },
      provinceId: 0
    });
     this.circleData = data;
   })
 }
 
 onChangeCircle = (event:any) =>{
  this.manageDataService.getDistrict().subscribe((data)=>{
    debugger;
    data= data.filter(x=>x.circleId == event.value);
    data.unshift({
      id: -1, name: 'Select',
      circleId: 0,
      isActive: false,
      circle: { id: -1, name: "", isActive: true, provinceId: -1 },
      provinceId: 0
    });
     this.districtData = data;
   })
 }

 
 get divisonControl() {
  return this.formDivision.get('divisionName');
}

}



