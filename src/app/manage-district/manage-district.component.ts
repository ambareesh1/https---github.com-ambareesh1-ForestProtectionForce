import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUser } from '../Models/AdmimUsersModel';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ManagedataService } from '../services/managedata.service';
import { Circle, CircleView, District, Province } from '../Models/ManageDataModels';
import { async } from '@angular/core/testing';
import { RefreshService } from '../services/refresh.service';
import { districtValidator } from '../custom-validators/customvalidators';


@Component({
  selector: 'app-manage-district',
  templateUrl: './manage-district.component.html',
  styleUrls: ['./manage-district.component.css']
})
export class ManageDistrictComponent {

  productDialog: boolean = false;
  Delete : any = "Delete";
  district : District[] = [];
  circleData : CircleView[]=[];
  provinceData : Province[] = [];
  submitted: boolean = true;
  search : any = "";

 formDistrict: FormGroup =new FormGroup({});
 constructor(private manageDataService: ManagedataService,
    private messageService: MessageService,
     private confirmationService: ConfirmationService,
      private fb: FormBuilder, private refreshService: RefreshService) { 
     }

 ngOnInit() {
  this.refreshService.refreshEvent.subscribe(() => {
   this.getDistrictData();
   this.getCircleData();
   this.getProvinceData();
  })
 }
 initForm(district: District = {} as District){
  
   this.formDistrict = this.fb.group({
    districtName: [district.name || '', Validators.required, [districtValidator(this.manageDataService)]],
    circle : [district.circleId || this.circleData.length>0 ? this.circleData[0].id:''],
    province : [this.provinceData[0].id || this.circleData[0].id]
   });
}

getDistrictData(){
 this.manageDataService.getDistrict().subscribe((data)=>{
   this.district = data;
 })
}

getCircleData = () => {
  this.manageDataService.getCircle().subscribe((data) =>{
     this.circleData = data;
     this.initForm();
    });
}

getProvinceData = () =>{
  this.manageDataService.getProvince().subscribe((data) =>{
    this.provinceData = data;
    this.initForm();
   });
}

onSubmitDistrict() {
  console.log(this.formDistrict.value);
   let districtData: District = {
     id: 0,
     name: this.formDistrict.value.districtName,
     isActive: true,
     circleId: this.formDistrict.value.circle
   };
  
   this.manageDataService.createDistrict(districtData).subscribe((x)=>{
    if(x){
     let districtAddmsg = "district "+this.formDistrict.value.districtName+ " saved"
     this.messageService.add({severity:'success', summary: 'Successful', detail: districtAddmsg, life: 5000});
     this.getDistrictData();
     this.formDistrict.reset();
    }
   })
}

 editDistrict(district: District) {
    this.initForm(district);
     this.productDialog = true;
 }

 deleteDistrict(district: District) {
         this.confirmationService.confirm({
           message: 'Are you sure you want to delete ' + district.name + '?',
           header: 'Confirm',
           icon: 'pi pi-exclamation-triangle',
           accept: () => {
             this.manageDataService.deleteDistrict(district.id).subscribe((x)=>{
               if(x==null){
               this.district = this.district.filter(val => val.id !== district.id);
                let districtDeltedItem = "district "+district.name+" is Deleted";
               this.messageService.add({severity:'success', summary: 'Successful', detail: districtDeltedItem, life: 3000});
               
           }
         })
       }
       });
 }

 onProvinceChange = (event:any) =>{
  this.manageDataService.getCircle().subscribe((data)=>{
    debugger;
    data= data.filter(x=>x.provinceId == event.value);
     this.circleData = data;
   })
 }
 

 hideDialog() {
     this.productDialog = false;
     this.submitted = false;
 }
 
 get districtControl() {
  return this.formDistrict.get('districtName');
}
 
}


