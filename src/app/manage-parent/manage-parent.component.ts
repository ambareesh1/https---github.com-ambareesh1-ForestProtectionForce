import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver  } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshService } from '../services/refresh.service';
import { SharedService } from '../services/shared.service';
import { fadeInEffect } from '../animations/custom-animations';
import { ManageProvinceComponent } from '../manage-province/manage-province.component'
import { ManageCircleComponent } from '../manage-circle/manage-circle.component';
import { ManageDistrictComponent } from '../manage-district/manage-district.component';
import { ManageDivisionComponent } from '../manage-division/manage-division.component';
import { ManageCompartmentComponent } from '../manage-compartment/manage-compartment.component';
import { ManageUserTypesComponent } from '../manage-user-types/manage-user-types.component';

@Component({
  selector: 'app-manage-parent',
  templateUrl: './manage-parent.component.html',
  styleUrls: ['./manage-parent.component.css'],
  providers: [RefreshService]
})
export class ManageParentComponent {

  isTabOpen : boolean = true;

  @ViewChild('provinceContainer', { read: ViewContainerRef })
  provinceContainer!: ViewContainerRef;
  @ViewChild('circleContainer', { read: ViewContainerRef })
  circleContainer!: ViewContainerRef;
  @ViewChild('districtContainer', { read: ViewContainerRef })
  districtContainer!: ViewContainerRef;
  @ViewChild('divisionContainer', { read: ViewContainerRef })
  divisionContainer!: ViewContainerRef;
  @ViewChild('compartmentContainer', { read: ViewContainerRef })
  compartmentContainer!: ViewContainerRef;
  @ViewChild('userTypesContainer', { read: ViewContainerRef })
  userTypesContainer!: ViewContainerRef;

  isSuperAdmin : boolean = false;
  constructor(private refreshService: RefreshService, private sharedService:SharedService, private componentFactoryResolver: ComponentFactoryResolver ) {
    this.isSuperAdmin = sharedService.isSuperAdmin();
  }

  
  refreshChildComponents(event:any) {
    debugger;
    if(this.isTabOpen){
    let componentFactory;
    switch (event.target.textContent.trim()) {
      case 'Manage Province':
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(ManageProvinceComponent);
        this.provinceContainer.clear();
        const provinceComponentRef = this.provinceContainer.createComponent(componentFactory);
        break;
      case 'Manage Circle':
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(ManageCircleComponent);
        this.circleContainer.clear();
        const circleComponentRef = this.circleContainer.createComponent(componentFactory);
        break;
      case 'Manage Forest Gamma Unit':
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(ManageDistrictComponent);
        this.districtContainer.clear();
        const districtComponentRef = this.districtContainer.createComponent(componentFactory);
        break;
      case 'Manage Forest Range':
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(ManageDivisionComponent);
        this.divisionContainer.clear();
        const divisionComponentRef = this.divisionContainer.createComponent(componentFactory);
        break;
      case 'Manage Compartment':
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(ManageCompartmentComponent);
        this.compartmentContainer.clear();
        const compartmentComponentRef = this.compartmentContainer.createComponent(componentFactory);
        break;
      case 'Manage User Types':
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(ManageUserTypesComponent);
        this.userTypesContainer.clear();
        const userTypesComponentRef = this.userTypesContainer.createComponent(componentFactory);
        break;
      default:
        break;
    }
  }
 // this.isTabOpen = !this.isTabOpen;
  }

  refreshChildComponentss(event:any) {
    if ((event.target as HTMLElement).classList.contains('p-accordion-header-link') || (event.target as HTMLElement).classList.contains('p-accordion-header-text')) {
      this.refreshService.emitRefreshEvent();
    }
  }
}




