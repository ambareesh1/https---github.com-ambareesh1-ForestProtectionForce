import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUser } from '../Models/AdmimUsersModel';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ManagedataService } from '../services/managedata.service';
import { Circle, CircleView, District, Division, Province } from '../Models/ManageDataModels';
import { RefreshService } from '../services/refresh.service';

@Component({
  selector: 'app-manage-division',
  templateUrl: './manage-division.component.html',
  styleUrls: ['./manage-division.component.css']
})
export class ManageDivisionComponent {


  productDialog: boolean = false;
  Delete : any = "Delete";
  division : Division[] = [];
  districtData : District[]=[];
  provinceData : Province[]=[];
  circleData : CircleView[] =[];
  submitted: boolean = true;
  search : any = "";
  isDivisionConf : boolean = true;

 formDivision: FormGroup =new FormGroup({});
 constructor(private manageDataService: ManagedataService,
    private messageService: MessageService,
     private confirmationService: ConfirmationService,
      private fb: FormBuilder, private refreshService: RefreshService) { 
     }

 ngOnInit() {
  this.refreshService.refreshEvent.subscribe(() => {
   this.getDivisionData();
   this.getDistrictData();
   this.getCircleData();
   this.getProvinceData();
  })
 }
 initForm(division: Division = {} as Division){
  
   this.formDivision = this.fb.group({
    divisionName: [division.name || '', Validators.required],
    district : [division.districtId || this.districtData[0].id],
    province : [this.provinceData[0].id || this.provinceData[0].id],
    circle : [this.circleData[0].id || this.circleData[0].id]
   });
}

getDivisionData(){
 this.manageDataService.getDivison().subscribe((data)=>{
   this.division = data;
 })
}

getDistrictData = () => {
  this.manageDataService.getDistrict().subscribe((data) =>{
     this.districtData = data;
     this.initForm();
    });
}
getProvinceData(){
  this.manageDataService.getProvince().subscribe((data)=>{
    this.provinceData = data;
  })
 }

 getCircleData(){
  this.manageDataService.getCircle().subscribe((data)=>{
    this.circleData = data;
  })
 }

onSubmitDivision() {
  console.log(this.formDivision.value);
   let divisionData: Division = {
     id: 0,
     name: this.formDivision.value.divisionName,
     isActive: true,
     districtId: this.formDivision.value.district
   };
  
   this.manageDataService.createDivison(divisionData).subscribe((x)=>{
    if(x){
     let divisionAddmsg = "division "+this.formDivision.value.divisionName+ " saved"
     this.messageService.add({severity:'success', summary: 'Successful', detail: divisionAddmsg, life: 5000});
     this.getDivisionData();
     this.formDivision.reset();
    }
   })
}

 editDivision(division: Division) {
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
 
 onChangeProvince = (event:any)=>{
  this.manageDataService.getCircle().subscribe((data)=>{
    debugger;
    data= data.filter(x=>x.provinceId == event.value);
     this.circleData = data;
   })
 }
 
 onChangeCircle = (event:any) =>{
  this.manageDataService.getDistrict().subscribe((data)=>{
    debugger;
    data= data.filter(x=>x.circleId == event.value);
     this.districtData = data;
   })
 }



}



