import { Component, Input, OnInit } from '@angular/core';
import { Lot } from '../Model/lot';
import { LotsService } from '../services/Lots.service';
import * as XLSX from 'xlsx';
import { Router, RouterLink } from '@angular/router';
import { AppareilService } from '../services/Appareil.service';
import { Appareil } from '../Model/Appareil';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
// lots: any;
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
ListOfappareil:Array<Appareil>=[];
ListOfData:Array<any>=[];
fileName= 'ExcelSheet.xlsx';

  constructor(private lotsService: LotsService,private appareilService:AppareilService, private router:Router) {
    this.lotsService.getLots().subscribe((data: Lot[]) =>{
    this.listOfLot=data;
    this.listOfLot.forEach(l =>{
       l.isEdit=false;

    });

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
    this.lotsService.getLots().subscribe((data: Lot[]) =>{
      // console.warn(data);
    this.listOfLot=data;

    });


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





  listOfColumn = [
    {
      title: 'N° du lot',
      compare: null,
      priority: false
    },
    {
      title: 'Marque',
      compare: (a: Lot, b: Lot) => null,
      priority: 3
    },
    {
      title: 'Diamètre',
      compare: (a: Lot, b: Lot) => a.diA_LOT_APT - b.diA_LOT_APT,
      priority: 2
    },
    {
      title: 'Service',
      compare: null,
      priority: false
    },
    {
      title: 'Nb Compteur',
      compare: (a: Lot, b: Lot) => a.nB_CMP_LOT - b.nB_CMP_LOT,
      priority: 1
    },
    {
      title: 'Fournisseur',
      compare: null,
      priority: 4
    },
    {
      title: 'Code Marche',
      compare:null,
      priority: false
    },
    {
      title: 'Quantité Marche',
      compare: (a: Lot, b: Lot) => a.qtE_MRC_LOT - b.qtE_MRC_LOT,
      priority: 5
    },

  ];

  exportToExcel(){
   let element =document.getElementById('lots-table');
   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

   XLSX.writeFile(wb,this.fileName);
  }
  addBtn(){
 this.router.navigateByUrl('addLot');
  }


  onEdit(item :any){
    this.listOfLot.forEach(l => {
      l.isEdit=false;
    });
   item.isEdit= true;
  }

  onSave(data:Lot){
    this.lotsService.updateLot(data).subscribe((res:any)=>{
      console.log(res);
      this.listOfLot;
      data.isEdit=false;
    }
    );
  }
  onCancel(){
    var lots:Lot[]
    this.lotsService.getLots().subscribe((data: Lot[]) =>{
      this.listOfLot=data;
      this.listOfLot.forEach(l =>{
         l.isEdit=false;
      });

      });



  }

}
