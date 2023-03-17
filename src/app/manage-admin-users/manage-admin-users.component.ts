import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from './product';
import { AdminUser } from '../Models/AdmimUsersModel';
import { ProductService } from './productservice';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AdminusersService } from '../services/adminusers.service';

@Component({
  selector: 'app-manage-admin-users',
  templateUrl: './manage-admin-users.component.html',
  styleUrls: ['./manage-admin-users.component.css']
})
export class ManageAdminUsersComponent {
  productDialog: boolean = false;
  Delete : any = "Delete";

    products: Product[] = [];
    adminUsers : AdminUser[] = [];
    product: any= {};

    selectedProducts: any = {};

    submitted: boolean = true;

    selectedUserType:any = "";
    userName : any = "";
    search : any = "";

    form: FormGroup =new FormGroup({});
    constructor(private productService: ProductService,
       private messageService: MessageService,
        private confirmationService: ConfirmationService,
         private fb: FormBuilder, private adminUsersService : AdminusersService) { 
       
        }

    userTypes = [ { label: 'Director', value: 'Director' },    { label: 'Joint Director', value: 'Joint Director' },    { label: 'Deputy Director', value: 'Deputy Director' },    { label: 'Data Entry Operator', value: 'Data Entry Operator' }];


    ngOnInit() {
      this.initForm();
        this.adminUsersService.getAdminUsersList().then(data => this.adminUsers = data)
    }
    initForm(user: AdminUser = {} as AdminUser){
      console.log(user);
      this.form = this.fb.group({
          userType: [user.userType || this.userTypes[0].value, Validators.required],
          username: [user.username || '', Validators.required],
          firstName: [user.firstName || '', Validators.required],
          lastName: [user.lastName || '', Validators.required],
          email: [user.email || '', [Validators.required, Validators.email]],
          alternateEmail: [user.alternativeEmail || '', Validators.email],
          phone: [user.phone || '', Validators.required],
          address: [user.address || '', Validators.required]
      });
  }
  
    onSubmit() {
      console.log(this.form.value);
  }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter(val => !this.selectedProducts.includes(val));
                this.selectedProducts = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
            }
        });
    }

    editProduct(user: AdminUser) {

       this.initForm(user);
        this.productDialog = true;
    }

    deleteProduct(user: AdminUser) {
      console.log(user,"deleted value")
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + user.username + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.adminUsers = this.adminUsers.filter(val => val.username !== user.username);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    
    saveProduct() {
        this.submitted = true;

        if (this.product.name.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;                
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            }
            else {
                this.product.id = this.createId();
                this.product.image = 'product-placeholder.svg';
                this.products.push(this.product);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 5; i++ ) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    
}
