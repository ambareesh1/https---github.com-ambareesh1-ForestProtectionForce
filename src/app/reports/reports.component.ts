import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ManagedataService } from '../services/managedata.service';
import { MessageService } from 'primeng/api';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { ReportsServicesService } from '../services/reports-services.service';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import  jsPDF from 'jspdf';
import autoTable, { Table } from 'jspdf-autotable'
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

// interface jsPDFWithPlugin extends jsPDF{
//   autotable : (options : UserOptions) => jsPDF;
// }

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
   currentDate = new Date();
  districtId : any = 0 ;
  formTypeValue : any = 1;
  value: Date | null =  new Date();
  formsTypes:any = []
  districts : any = [];
  FormAReportModel:any = [];
  FormBReportModel :any = [];
  FormCReportModel : any = [];
  FormAbstractMonth : any = [];
  FormMonthCF : any = [];
  items : any = [];
  cols!: Column[];
  _selectedColumns!: Column[];
  tdElements = Array.from({ length: 15 });
  reportHeader : any = "Form A - Joint";
  reportYear : any = this.getMonthName(this.currentDate.getMonth())+' '+this.currentDate.getFullYear();
  month:number =  this.currentDate.getMonth()+1;
  year : number = this.currentDate.getFullYear();
  selectedFinancialYear: any = this.currentDate.getFullYear();
  financialYears: { label: string; value: number }[] = [];
  isFinancialYearSelected : boolean = false;
  checkboxOptions: any[] = [];
  calendarYear :any;
  isJoint : boolean = true;
  isJointDirector:boolean = false;
  province:any =0;
  selectedCheckboxOptions: any[] = [];
  dataLoaded: boolean = false; // Initially set to false
  typeOfDateSelection : string  = 'month';
  circleName : string = '';
  districtName : string = '';
  @ViewChild('dtReportA') table!: ElementRef;
  constructor(
    private manageDataService : ManagedataService,
    private messageService: MessageService,
    private sharedService : SharedService,
    private reportsServices : ReportsServicesService, 
     private route: ActivatedRoute) { 
      this.financialYears = this.generateFinancialYears();
       this.reportsServices.getFormAReport(this.districtId, this.month, this.year, this.isJoint,this.province);
       this.formsTypes = [
        {name : 'Select', code : -1 },
        {name: 'Form A - Joint', code: 1},
        {name: 'Form A - Independent', code: 6},
        {name: 'Form B', code: 2},
        {name: 'Form C', code: 3},
        {name: 'Abstract Month', code: 4},
        {name: 'Month CF', code: 5}
    ];
    }
  ngOnInit(): void {
   debugger;
   this.districtId = this.sharedService.isCaseEntryOperator() || this.sharedService.isDuptyDirector() ?  this.sharedService.getDistrictId() : this.districtId;
   this.isJointDirector = this.sharedService.isJointDirector();
   this.province = this.sharedService.getProvinceForSuperAdminOrNormal();
   this.getDistrictData();
    this.manageDataService.getCircleByid(this.sharedService.getCircleId()).subscribe((x:any)=>{
      this.circleName = x.name;
   });
   this.manageDataService.getDistricteByid(this.sharedService.getDistrictId()).subscribe((x:any)=>{
      this.districtName = x.name;
   })
   this.getReportA();
  }

    onChangeForm = () =>{
      this.dataLoaded = false;
      this.messageService.clear();
      // Show fetching message
      this.messageService.add({
        severity: 'info',
        summary: 'Fetching Seizure Report',
        detail: 'Fetching the seizure report for selected district...',
        life: 1000
      });
    
      if(this.formTypeValue == 1 || this.formTypeValue == 6){
        this.reportHeader = this.formTypeValue == 1 ? "Form A - Joint" : "Form A - Independent";
        this.isJoint =  this.formTypeValue == 1 ? true:false;
        this.getReportA();
      }else if(this.formTypeValue == 2){
        this.getFormBReport();
        this.reportHeader = "Performance Report of Forest Protection Force Kashmir Region Ending";
      }else if(this.formTypeValue == 3){
        this.getFormCReport();
      
        this.reportHeader = "Status of Seizure cases for the month  of ";
      }else if(this.formTypeValue == 4){
        //this.getAbstractMontheReport();
        this.getSeizureAItemNames();
        this.reportHeader = "ABSTRACT OF SEIZURES ENDING ";
      }else if(this.formTypeValue == 5){
        this.getMonthCFReport();
        this.reportHeader = "Summary of Seizures made by FPF During Forest Protection Operation in Kashmir Region Ending Month"
      }
      else{
        this.getReportA();
      }
    }

    onMonthChange = () =>{
      debugger;
      this.dataLoaded = false;
      this.month = this.value? this.value.getMonth()+1 : 0;
      this.year = this.value?.getFullYear()??0;
      this.reportYear =  this.getMonthName(this.month)+' '+this.year
      this.isFinancialYearSelected = false;
      this.onChangeForm();
    }

    onYearChange = () =>{
      this.typeOfDateSelection = 'calendaryear';
      this.year = this.calendarYear.getFullYear();
      this.reportYear = "Calendar Year -"+ this.year;
      console.log(this.year);
      this.onChangeForm();
    }

    onFinancialYearChange = (event:any) =>{
      this.typeOfDateSelection = 'financialyear';
      this.isFinancialYearSelected = true;
      //console.log(this.selectedFinancialYear);
      this.year = this.selectedFinancialYear['value'];
      this.reportYear = "Financial Year "+this.selectedFinancialYear['label'];
      this.onChangeForm();
    }

    onClickFinancialYear = () =>{
      this.financialYears = this.generateFinancialYears();
    }


    getDistrictData = () => {

      if (this.isJointDirector) {
        this.manageDataService.getCircle().subscribe((circles: any[]) => {
          const filteredCircles = circles.filter(circle => circle.provinceId === this.province);
      
          this.manageDataService.getDistrict().subscribe((districts: any[]) => {
            this.districts = districts.filter(district => filteredCircles.some(filteredCircle => filteredCircle.id === district.circleId));
          });
        });
      }
      
     this.manageDataService.getDistrict().subscribe((x)=>{
           this.districts = (this.sharedService.isSuperAdminOrJammuOrKashmir() || this.sharedService.isDirector() || this.sharedService.isJointDirector()) ? x : x.filter(x=>x.id == this.districtId);
           this.districts = this.districts.sort((a: any, b: any) => b.ID - a.ID); // Sorting in descending order based on 
      });
     
    }
   
    getReportA = () =>{
      debugger;
      this.reportsServices.getFormAReport(this.districtId, this.month, this.year, this.isJoint ,this.province).subscribe((x:any)=>{
          this.dataLoaded = true;
          console.log(x);
          this.FormAReportModel = x;
          let itemsList = x.map((y:any)=>y.item);
          this.items = [...new Set(itemsList)];
      })
    }


    getFormBReport = () =>{
      this.reportsServices.getFormBReport(this.districtId, this.month, this.year ,this.province).subscribe((data) => {
        this.FormBReportModel = data;
        this.dataLoaded = true;
      });

      this.cols = [
        { field : 'gamma_Unit' , header:'Gamma Unit', subColumns : []},
        { field : 'nakas_Laid' , header:'No of Nakas Laid', subColumns : []},
        { field : 'patrollings_Performed' , header:'No. of Petrolling Performed', subColumns : []},
        { field: 'jungle_Gashts_Performed', header: 'No. of Jungle Gashts Performed', subColumns : [] },
        { field: 'joP_Reports_Received', header: 'No. of JOP Reports Received', subColumns : [] },
        { field: 'no_Of_Fire_Fighting_Operations', header: 'No. of Fire fighting Operations' , subColumns : []},
        { field: 'no_Of_Fire_Fighting_Operations', header: 'No. of Wildlife Poaching incidents', subColumns : [] },
        { field: 'empty', header: 'No. of Complaints', subColumns : [{field : 'complaints_Verified' , header:'Verified'},{field : 'complaints_Received' , header:'Received'}]},
        {field : 'empty', header : 'No. of Requisitions', subColumns : [{field : 'requisitions_Attended' , header:'Attended'},{field : 'requisitions_Made' , header:'Made'}]}

      ];

      this._selectedColumns = this.cols;
    }

    getFormCReport = () =>{
      this.reportsServices.getFormCReport(this.districtId, this.month, this.year, this.province).subscribe((data) => {
        this.FormCReportModel = data;
        this.dataLoaded = true;
      });

      this.cols = [
        { field : 'districtId' , header:'Gamma Unit', subColumns : []},
        { field : 'opening_Balance' , header:'Opening balance as on 1st day of each month', subColumns : []},
        { field : 'cases_Registered_Month' , header:'Registered during the month', subColumns : []},
        { field: 'total', header: 'Total', subColumns : [] },
        { field: 'disposed_Cases_Month', header: 'Cases Disposed off during the month', subColumns : [] },
        { field: 'balance', header: 'Balance' , subColumns : []},
        {
          field: 'empty',
          header: 'Status of the Cases',
          subColumns: [
            {
              field: 'empty',
              header: 'Pendency of registered cases',
              childSubColumns: [
                { field: 'authorized_Officer_FD', header: 'Authorized Officer' },
                { field: 'session_Court', header: 'Session Court/CJM' },
                { field: 'under_Investigation', header: 'Under Investigation' }
              ]
            },
            {
              field: 'empty',
              header: 'Pendency of Appeals',
              childSubColumns: [
                { field: 'pccf', header: 'PCCF' },
                { field: 'session_Court', header: 'Session Court' },
                { field: 'high_Court', header: 'High Court' },
                { field: 'court', header: 'Supreme Court' },
                { field: 'others', header: 'Others' }
              ]
            }
          ]
        },
      ];

      this._selectedColumns = this.cols;
    }

    getAbstractMontheReport = () =>{
      debugger;
      const datePipe = new DatePipe('en-US');
      const currentDate = new Date(); // Replace this with your actual date variable
      const previousMonthDate = new Date(this.value??0);
      previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
      this.reportsServices.getAbstractFormReport(this.districtId, this.month, this.year, this.selectedCheckboxOptions, this.typeOfDateSelection, this.province).subscribe((data) => {
        this.FormAbstractMonth = data;
        this.dataLoaded = true;
      });

      this.cols = [
        { field : 'header' , header:'Seizure', subColumns : []},
        //{ field : 'cft' , header:'Unit', subColumns : []},
        { field : 'prev' , header:'Previous', subColumns : []},
        { field: 'current', header: 'Current', subColumns : [] },
        { field: 'cumulative', header: 'Cumulative', subColumns : [] }
      ];

      this._selectedColumns = this.cols;
    }


    getMonthCFReport = () =>{
      this.reportsServices.getMonthMFFormReport(this.districtId, this.month, this.year, this.isFinancialYearSelected, this.typeOfDateSelection, this.province).subscribe((data) => {
      
        // this.FormMonthCF = this.sharedService.isSuperAdminOrJammuOrKashmir() ?  data : data.filter(x=>x.circle == this.circleName);
        // if(!(this.sharedService.isSuperAdminOrJammuOrKashmir() || this.sharedService.isSuperAdminOfJammu() || this.sharedService.isSuperAdminOfKashmir())){
        //   if(this.FormMonthCF[0].districts.length>2){
        //     let subTotal = 
        //     this.FormMonthCF[0].districts = (this.FormMonthCF[0].districts.filter((x:any)=>x.district == this.districtName || x.district.indexOf('Sub Total')>-1)) 
        //   }
        // }
        this.FormMonthCF = data;
        this.dataLoaded = true;
      });

      let subColumns =  [ {
        field: 'Timber',
        header: 'Timber'
      },{
        field: 'Fire wood (in Qtis)',
        header: 'Firewood (in Qtls)'
      },{
        field: 'Seizure of vehicles (Nos )',
        header: 'Vehicles (in No)'
      },{
        field: 'Seizure of Horses/Pones',
        header: 'Horses/ponies (in No)'
      },{
        field: 'MFP Seized',
        header: 'M.F.P (Kgs)'
      } ];

      this.cols = [
        { field : 'circle' , header:'Circle / Gamma Unit', subColumns : []},
        { field : 'Previous' , header:'Previous', subColumns : subColumns},
        { field : 'Current' , header:'Current', subColumns : subColumns},
        { field: 'cumulative', header: 'Cumulative', subColumns : subColumns }
      ];

      this._selectedColumns = this.cols;
    }

    getSeizureAItemNames = () =>{
      this.reportsServices.getItemNamesFromSezureOne().subscribe(x=>{
        x.forEach(element => {
          this.checkboxOptions.push({label: element, value: element})
        });
      })
    }

    @Input() get selectedColumns(): any[] {
      return this._selectedColumns;
    }

    set selectedColumns(val: any[]) {
      //restore original order
      this._selectedColumns = this.cols.filter((col) => val.includes(col));
    }

    calculateColumnTotal( column: string): number {
      return this.FormBReportModel.reduce((total:any, item:any) => total + (item[column] || 0), 0);
    }
    calculateReportCColumnTotal( column: string): number {
      
      if(this.FormCReportModel !== undefined){
       if(this.isFieldExists(column))
       {
        return this.FormCReportModel.map((x:any)=>x.seizure_CasesMonth_Form_Cs).reduce((total:any, item:any) => total + (item[column] || 0), 0);
      } 
    }
    return 0;
    }

    disabledTheSelectedColumnsTotal ( field: string, isSubField : boolean): boolean {
      if(isSubField){
        return this.cols.filter((x:any)=>x.subColumns[0].field == field).length>0;
      }
      return this.cols.filter((x:any)=>x.field == field).length>0; 
    }

    isFieldExists = (column:string)=>{
      return this.FormCReportModel.map((x:any)=>x.seizure_CasesMonth_Form_Cs).some((item:any) => item.hasOwnProperty(column));
    }

   // Reports Genaration in Excel sheet 

   exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('ReportA'));
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'Form A Report.xlsx');
  }

  exportToExcelFormB() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('ReportB'));
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'Form B Report.xlsx');
  }


  
  exportToExcelFormC() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('ReportC'));
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'Form C Report.xlsx');
  }

  exportToExcelAbstractMonth() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('ReportAbstractMonth'));
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'Abstract Month Report.xlsx');
  }

  exportToExcelMonthCF() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('ReportMonthCF'));
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'Month CF Report.xlsx');
  }


  exportPdf(nameOfPdf : string) {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        
      const customWidth = 900; // Set your desired width in pixels
      const customHeight = 500; // Use the same height as A4
      
      // Create the PDF with custom dimensions
      const doc = new jsPDF.default({
        orientation: 'l',
        unit: 'px',
        format: [customWidth, customHeight],
      });
       // Set font properties
       doc.setFont('helvetica'); // Choose the desired font
      
       doc.setTextColor('#495057'); // Set text color
 
       // Calculate the text width and centered position
       const text = this.reportHeader+" - "+this.reportYear;;
       const fontSize = 12;
       const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
       const textX = (doc.internal.pageSize.getWidth() - textWidth) / 2;
 
       // Draw the centered text
       doc.text(text, textX, 10);
          (doc as any).autoTable({html:'table'});
          doc.save(nameOfPdf+'.pdf');
      });
  });
  }

    private generateFinancialYears(): { label: string; value: number }[] {
      const currentYear = new Date().getFullYear();
      const years: { label: string; value: number }[] = [];
      const yearsRange = 10; // Adjust the range as needed
  
      for (let i = currentYear - yearsRange; i <= currentYear; i++) {
        years.push({
          label: `${i} - ${i + 1}`,
          value: i,
        });
      }
  
      return years;
    }

    private getMonthName(monthIndex: number): string {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      return months[monthIndex];
    }

    onSelectItem = (selectedItem:any) =>{
    
      this.FormAReportModel = this.FormAReportModel.filter((items:any) => items.Item !== selectedItem);
    }

  
}


interface Column {
  field: string;
  header: string;
  subColumns?: {
    field: string;
    header: string;
    childSubColumns?: {
      field: string;
      header: string;
    }[];
  }[];
}

