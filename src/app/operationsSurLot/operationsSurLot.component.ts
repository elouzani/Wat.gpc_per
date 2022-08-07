import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { Lot } from '../Model/lot';
import { AppareilService } from '../services/Appareil.service';
import { LotsService } from '../services/Lots.service';

@Component({
  selector: 'app-operationsSurLot',
  templateUrl: './operationsSurLot.component.html',
  styleUrls: ['./operationsSurLot.component.css']
})
export class OperationsSurLotComponent implements OnInit {
  fileName= 'ExcelSheet.xlsx';
  listOfLot:Array<Lot>=[];
// listOfLotAppareils: Array<Lot>=[];
listOfService: string[];
listeOfMarque: string[];
selectedService : string;
selectedMarque: string;
numlot:string;
nbCmpt:number;
annee:Date;
lotsFiltering:Array<Lot>=[];

  constructor(private lotsService: LotsService,private appareilService:AppareilService, private router:Router) {

    this.lotsService.getLots().subscribe((data: Lot[]) =>{
      this.listOfLot=data;
      });

      this.lotsService.getServices().subscribe((services:any)=>{
        // console.warn(services);
        this.listOfService = services;
      });

      this.lotsService.getMarques().subscribe((marques: any) =>{
        // console.warn(marques);
        this.listeOfMarque=marques
      });


   }



  ngOnInit() {
  }


  exportToExcel(){
    let element =document.getElementById('lots-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb,this.fileName);
   }


   Search(numlot,nbCmpt,annee,selectedService,selectedMarque){
    this.lotsFiltering=[];

  if(this.numlot==null&& this.nbCmpt==null&&this.annee==null&&this.selectedMarque==null&&this.selectedService==null){
    this.lotsService.getLots().subscribe((data: Lot[]) =>{
    this.listOfLot=data;
    console.log("this.listOfLot",this.listOfLot)
    })


  }
   if(this.numlot !=null && this.nbCmpt == null && this.annee == null && this.selectedMarque == null && this.selectedService == null){
   for(let i=0;i<=this.listOfLot.length;i++){
    //console.log("for 1");
    if(this.listOfLot[i].nuM_LOT_APT !=undefined && this.numlot ==this.listOfLot[i].nuM_LOT_APT ){
        console.log("im inside of", this.listOfLot);
        this.lotsFiltering.push(this.listOfLot[i]);

        console.log(this.lotsFiltering);
        this.listOfLot=this.lotsFiltering;
        console.log(this.lotsFiltering);
      }

   }

  }

  if(this.numlot !=null && this.nbCmpt == null && this.annee == null && this.selectedMarque != null && this.selectedService == null){
    for(let i=0;i<=this.listOfLot.length;i++){
     //console.log("for 1");
     if(this.listOfLot[i].nuM_LOT_APT !=undefined && this.listOfLot[i].mrQ_LOT_APT !=undefined && this.numlot ==this.listOfLot[i].nuM_LOT_APT &&
      this.selectedMarque ==this.listOfLot[i].mrQ_LOT_APT){
         console.log("im inside of", this.listOfLot);
         this.lotsFiltering.push(this.listOfLot[i]);

         console.log(this.lotsFiltering);
         this.listOfLot=this.lotsFiltering;
         console.log(this.lotsFiltering);
       }

    }

   }

   if(this.numlot ==null && this.nbCmpt != null && this.annee == null && this.selectedMarque == null && this.selectedService == null){
    for(let i=0;i<this.listOfLot.length;i++){
     //console.log("for 1");
     if(this.listOfLot[i].nB_CMP_LOT !=undefined && this.nbCmpt ==this.listOfLot[i].nB_CMP_LOT ){
         console.log("im inside of", this.listOfLot);
         this.lotsFiltering.push(this.listOfLot[i]);

         console.log(this.lotsFiltering);
         this.listOfLot=this.lotsFiltering;
         console.log(this.lotsFiltering);
       }

    }

   }

   if(this.numlot ==null && this.nbCmpt == null && this.annee == null && this.selectedMarque != null && this.selectedService == null){
    for(let i=0;i< this.listOfLot.length;i++){
     //console.log("for 1");
     if(this.listOfLot[i].mrQ_LOT_APT !=undefined && this.selectedMarque ==this.listOfLot[i].mrQ_LOT_APT){
         console.log("im inside of", this.listOfLot);
         this.lotsFiltering.push(this.listOfLot[i]);

         console.log(this.lotsFiltering);
       }

    }
    this.listOfLot=this.lotsFiltering;

   }

   if(this.numlot !=null && this.nbCmpt != null && this.annee == null && this.selectedMarque == null && this.selectedService == null){
    for(let i=0;i<=this.listOfLot.length;i++){

     if(this.numlot ==this.listOfLot[i].nuM_LOT_APT && this.nbCmpt ==this.listOfLot[i].nB_CMP_LOT){
         console.log("im inside of 2 ", this.listOfLot);
         this.lotsFiltering.push(this.listOfLot[i]);

         console.log(this.lotsFiltering);
         this.listOfLot=this.lotsFiltering;
         console.log(this.lotsFiltering);
       }

    }

   }

    if(numlot == null && nbCmpt == null && annee != null && selectedMarque == null && selectedService ==null){
    this.listOfLot.forEach(l => {
      var ann=new Date(l.anneE_LOT_APT)
      if(ann.getFullYear() == annee){
          this.lotsFiltering.push(l);
          this.listOfLot=this.lotsFiltering;
      }
    });

   }if(numlot == '' && nbCmpt == '' && annee != '' && selectedMarque != '' && selectedService != ''){
    this.listOfLot.forEach(l => {
      if(l.anneE_LOT_APT  == annee && l.mrQ_LOT_APT == selectedMarque && l.svC_LOT_APT == selectedService){
          this.lotsFiltering.push(l);
          this.listOfLot=this.lotsFiltering;
      }
    });

   }  if(numlot == '' && nbCmpt == '' && annee == '' && selectedMarque != '' && selectedService != ''){
    this.listOfLot.forEach(l => {
      if(l.mrQ_LOT_APT == selectedMarque && l.svC_LOT_APT == selectedService){
        this.lotsFiltering.push(l);
          this.listOfLot=this.lotsFiltering;
      }
    });

   } if(numlot == '' && nbCmpt == '' && annee == '' && selectedMarque == '' && selectedService !=null){
    this.listOfLot.forEach(l => {
      if(l.svC_LOT_APT == selectedService){
        this.lotsFiltering.push(l);
          this.listOfLot=this.lotsFiltering;
      }
    });

   }
   return this.listOfLot;
  }



  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.iD_LOT_APT, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.iD_LOT_APT, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Lot[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.iD_LOT_APT, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly Lot[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.iD_LOT_APT));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.iD_LOT_APT)) && !this.checked;
  }


}
