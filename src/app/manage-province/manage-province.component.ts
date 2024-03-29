import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUser } from '../Models/AdmimUsersModel';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ManagedataService } from '../services/managedata.service';
import { Province } from '../Models/ManageDataModels';
import { provinceValidator } from '../custom-validators/customvalidators';


@Component({
  selector: 'app-manage-province',
  templateUrl: './manage-province.component.html',
  styleUrls: ['./manage-province.component.css']
})
export class ManageProvinceComponent {

    productDialog: boolean = false;
     Delete : any = "Delete";
     btnTitle : any = "Add";
     province : Province[] = [];
     provinceDataOnEdit : Province = {} as Province;
    submitted: boolean = true;
    search : any = "";
    isProvinceTaken : boolean = false;
    formProvince: FormGroup =new FormGroup({});
    constructor(private manageDataService: ManagedataService,
       private messageService: MessageService,
        private confirmationService: ConfirmationService,
         private fb: FormBuilder) { 
        }

    ngOnInit() {
      this.initForm();
      this.getProvinceData();
    }
    initForm(province: Province = {} as Province){
     
      this.formProvince = this.fb.group({
          provinceName: [province.name || '', Validators.required, [provinceValidator(this.manageDataService)]]
      });
  }

  getProvinceData(){
    this.manageDataService.getProvince().subscribe((data)=>{
      this.province = data;
    })
  }
  
  onSubmitProvince() {
    this.btnTitle = "Add";
     if(Object.keys(this.provinceDataOnEdit).length === 0){
      let provinceData: Province = {
        id: 0,
        name: this.formProvince.value.provinceName,
        isActive: true
      };
     
      this.manageDataService.createProvince(provinceData).subscribe((x)=>{
       if(x){
        let provinceAddmsg = "Province "+this.formProvince.value.provinceName+ " saved"
        this.messageService.add({severity:'success', summary: 'Successful', detail: provinceAddmsg, life: 5000});
        this.formProvince.reset();
        this.getProvinceData();
       }
      })
     }else{
      this.provinceDataOnEdit.name = this.formProvince.value.provinceName;
      this.manageDataService.updateProvince(this.provinceDataOnEdit.id, this.provinceDataOnEdit).subscribe((x)=>{
       
         let provinceAddmsg = "Province "+this.formProvince.value.provinceName+ " updated"
         this.messageService.add({severity:'success', summary: 'Successful', detail: provinceAddmsg, life: 5000});
         this.formProvince.reset();
         this.getProvinceData();
        this.provinceDataOnEdit = {} as Province;
       })
     }

     
  }

    editProvince(province: Province) {
      this.btnTitle = "Update"
       this.initForm(province);
       this.provinceDataOnEdit = province;
        this.productDialog = true;
    }

    deleteProvince(province: Province) {
            return this.confirmationService.confirm({
              message: 'Are you sure you want to delete ' + province.name + '?',
              header: 'Confirm',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                this.manageDataService.deleteProvince(province.id).subscribe((x)=>{
                  
                  console.log(x);
                  if(x==null){
                  this.province = this.province.filter(val => val.id !== province.id);
                   let provinceDeltedItem = "province "+province.name+" is Deleted";
                  this.messageService.add({severity:'success', summary: 'Successful', detail: provinceDeltedItem, life: 3000});
                  
              }
            })
          }
          });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    onReset(){
      this.formProvince.reset();
      this.btnTitle = "Add";
    }
    
    onFocusOutProvince (event:any){
      
      let name = this.formProvince.value.provinceName;
      if(name!=""){
      this.manageDataService.getProvinceByName(name).subscribe(x=>{
        console.log(x);
         this.isProvinceTaken = true;
      },
      error => {
        console.error('An error occurred while getting province by name:', error);
        this.isProvinceTaken = false;
      })
    }else{
      this.isProvinceTaken = false;
    }
    }
    get provinceControl() {
      return this.formProvince.get('provinceName');
    }
}
