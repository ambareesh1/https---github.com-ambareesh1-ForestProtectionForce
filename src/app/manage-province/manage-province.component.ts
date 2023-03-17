import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUser } from '../Models/AdmimUsersModel';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ManagedataService } from '../services/managedata.service';
import { Province } from '../Models/ManageDataModels';


@Component({
  selector: 'app-manage-province',
  templateUrl: './manage-province.component.html',
  styleUrls: ['./manage-province.component.css']
})
export class ManageProvinceComponent {

    productDialog: boolean = false;
     Delete : any = "Delete";
     province : Province[] = [];
    submitted: boolean = true;
    search : any = "";

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
          provinceName: [province.name || '', Validators.required]
      });
  }

  getProvinceData(){
    this.manageDataService.getProvince().subscribe((data)=>{
      this.province = data;
    })
  }
  
  onSubmitProvince() {
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
  }

    editProvince(province: Province) {
       this.initForm(province);
        this.productDialog = true;
    }

    deleteProvince(province: Province) {
            this.confirmationService.confirm({
              message: 'Are you sure you want to delete ' + province.name + '?',
              header: 'Confirm',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                this.manageDataService.deleteProvince(province.id).subscribe((x)=>{
                  debugger;
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
    

    
}
