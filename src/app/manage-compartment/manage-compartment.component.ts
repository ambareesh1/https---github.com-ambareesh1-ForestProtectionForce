import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUser } from '../Models/AdmimUsersModel';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ManagedataService } from '../services/managedata.service';
import { CircleView, Compartment, District, Division, Province } from '../Models/ManageDataModels';
import { RefreshService } from '../services/refresh.service';
import { compartmentValidator } from '../custom-validators/customvalidators';
import { Observable, forkJoin } from 'rxjs';


@Component({
  selector: 'app-manage-compartment',
  templateUrl: './manage-compartment.component.html',
  styleUrls: ['./manage-compartment.component.css']
})
export class ManageCompartmentComponent {

  productDialog: boolean = false;
  Delete : any = "Delete";
  btnTitle : any = "Add";
  compartmentDataOnEdit : Compartment = {} as Compartment;
  compartment : Compartment[] = [];
  divisontData : Division[]=[];
  districtData : District[]=[];
  provinceData : Province[]=[];
  circleData : CircleView[] =[];
  submitted: boolean = true;
  isDataLoaded : boolean = false;
  search : any = "";

 formCompartment: FormGroup =new FormGroup({});
 constructor(private manageDataService: ManagedataService,
    private messageService: MessageService,
     private confirmationService: ConfirmationService,
      private fb: FormBuilder, private refreshServie : RefreshService) { 
     }

 ngOnInit() {

   
   this.getDivisionData();
   this.getDistrictData();
   this.getCircleData();
   this.getProvinceData();
 


   const sources$: Observable<any>[] = [
    //this.getDivisionData(),
    //this.getDistrictData(),
    //this.getCircleData(),
    this.getProvinceData(),
    this.getCompartmentData()
  ];

  forkJoin(sources$).subscribe((data: any[]) => {
   // this.divisontData = data[0];
   // this.districtData = data[1];
    //this.circleData = data[2];
    data[0].unshift({
      id: -1,
      name: 'Select',
      districtId: -1,
      isActive: false,
      circleId: 0,
      provinceId: 0
    });
    this.provinceData = data[0];
    this.compartment = data[1];
    this.isDataLoaded = true;
    this.initForm();
  });
  
 }
 initForm(compartment: Compartment = {} as Compartment){
  
   this.formCompartment = this.fb.group({
    compartmentName: ['' || compartment.name , Validators.required, [compartmentValidator(this.manageDataService)]],
    division : ['' || compartment.divisionId ],
    province : ['' || compartment.provinceId],
    circle : ['' || compartment.circleId],
    district : ['' || compartment.districtId]
   });
}

getCompartmentData(){
 return this.manageDataService.getCompartment();
}

getDivisionData = () => {
 return  this.manageDataService.getDivison();
}

getDistrictData = () => {
  return this.manageDataService.getDistrict();
}

getProvinceData(){
  return this.manageDataService.getProvince();
 }

 getCircleData(){
  return this.manageDataService.getCircle();
 }

onSubmitCompartment() {
  this.btnTitle = "Add";
  if(Object.keys(this.compartmentDataOnEdit).length === 0){
   let compartmentData: Compartment = {
     id: 0,
     name: this.formCompartment.value.compartmentName,
     isActive: true,
     divisionId: this.formCompartment.value.division,
     circleId:  this.formCompartment.value.circle,
     districtId:  this.formCompartment.value.district,
     provinceId:  this.formCompartment.value.province
   };
  
   this.manageDataService.createCompartment(compartmentData).subscribe((x)=>{
    if(x){
     let compartmentAddmsg = "compartment "+this.formCompartment.value.compartmentName+ " saved"
     this.messageService.add({severity:'success', summary: 'Successful', detail: compartmentAddmsg, life: 5000});
     this.refreshCompartmentData();
     this.formCompartment.reset();
    }
   })
  }else{
    this.compartmentDataOnEdit.name = this.formCompartment.value.compartmentName;
    this.manageDataService.updateCompartment(this.compartmentDataOnEdit.id, this.compartmentDataOnEdit).subscribe((x)=>{
     
       let provinceAddmsg = "compartment "+this.formCompartment.value.compartmentName+ " updated"
       this.messageService.add({severity:'success', summary: 'Successful', detail: provinceAddmsg, life: 5000});
       this.formCompartment.reset();
       this.refreshCompartmentData();
      this.compartmentDataOnEdit = {} as Compartment;
     })
  }
}

refreshCompartmentData = () =>{
  this.getCompartmentData().subscribe((x)=>{
    this.compartment = x;
  })
}

 editCompartment(compartment: Compartment) {
  this.btnTitle = "Update";
  this.compartmentDataOnEdit = compartment;
    this.initForm(compartment);
     this.productDialog = true;
 }

 deleteCompartment(compartment: Compartment) {
         this.confirmationService.confirm({
           message: 'Are you sure you want to delete ' + compartment.name + '?',
           header: 'Confirm',
           icon: 'pi pi-exclamation-triangle',
           accept: () => {
             this.manageDataService.deleteDivison(compartment.id).subscribe((x)=>{
               if(x==null){
               this.compartment = this.compartment.filter(val => val.id !== compartment.id);
                let compartmentDeltedItem = "compartment "+compartment.name+" is Deleted";
               this.messageService.add({severity:'success', summary: 'Successful', detail: compartmentDeltedItem, life: 3000});
               
           }
         })
       }
       });
 }

 hideDialog() {
     this.productDialog = false;
     this.submitted = false;
 }
 
 onChangeProvince = (event:any)=>{
  this.manageDataService.getCircle().subscribe((data)=>{
   
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

 onChangDistrict = (event:any) =>{
  this.manageDataService.getDivison().subscribe((data)=>{
    
    data= data.filter(x=>x.districtId == event.value);
     this.divisontData = data;
   })
 }
 
 get compartmentControl() {
  return this.formCompartment.get('compartmentName');
}

}
