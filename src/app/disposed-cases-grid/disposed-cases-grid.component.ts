import { Component, OnInit } from '@angular/core';
import { DisposedCasesModel } from '../Models/DisposedCasesModel';
import { DisposedCasesService } from '../services/disposed-cases.service';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInEffect } from '../animations/custom-animations';
import { DatePipe } from '@angular/common';
import { disposedEnum } from '../enums/DisposedEnum';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DisposalViewComponent } from '../disposal-view/disposal-view.component';

@Component({
  selector: 'app-disposed-cases-grid',
  templateUrl: './disposed-cases-grid.component.html',
  styleUrls: ['./disposed-cases-grid.component.css'],
  animations:[fadeInEffect]
})
export class DisposedCasesGridComponent implements OnInit {
  disposed : DisposedCasesModel[] = [];
  searchValue : any = null;
  ref: DynamicDialogRef | undefined;
  
  constructor(private disposedServices : DisposedCasesService, private sharedService: SharedService,
    private route: ActivatedRoute, 
     private disposedCasesService : DisposedCasesService,  private router: Router,public dialogService: DialogService )
  {
    
  }
  ngOnInit(): void {
    this.getDisposedCases();
  }

getDisposedCases = () =>{
  this.disposedCasesService.getDisposedCases().subscribe((x)=>{
    
    console.log(x);
    this.disposed = x;
  })
}

navigateToCasesTobeDisposed = () =>{
  this.router.navigate(['/disposed']);
}

editDisposed = (disposed:any) =>{
  this.router.navigate(['/disposed/'+disposed.id+'']);
}

viewDispoedCase = (disposed:any) =>{
  this.show(disposed);
}

convertToDate = (onlyDate:any)=>{
  const datePipe = new DatePipe('en-US');
  const formattedDate = datePipe.transform(onlyDate, 'yyyy-MM-dd');
  return formattedDate;
}

convertStatus = (id:any) =>{
  
  return disposedEnum[id];
}
show(disposal:DisposedCasesModel) {
  this.ref = this.dialogService.open(DisposalViewComponent, {
      header: 'Disposed Cases',
      width: '90%',
      contentStyle: {"max-height": "600px", "overflow": "auto"},
      baseZIndex: 10000,
      data: disposal.id
  });
}
}
