import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as XLSX from 'xlsx';
import { Appareil } from '../Model/Appareil';
import { Lot } from '../Model/lot';
import { AlertifyService } from '../services/Alertify.service';
import { AppareilService } from '../services/Appareil.service';
import { LotsService } from '../services/Lots.service';

@Component({
  selector: 'app-listCompteurs',
  templateUrl: './listCompteurs.component.html',
  styleUrls: ['./listCompteurs.component.css']
})
export class ListCompteursComponent implements OnInit {

  fileName= 'ExcelSheet.xlsx';
  listOfLot:Array<Lot>=[];
  listOfAppareil :Array<Appareil>=[];
  listNumLot: string;
  selectedNumero:string;
  numAppareil: string;
  appareilSearched:Appareil[];
   public Diametre: string;
   public NumLot: string;



  constructor(private appareilService: AppareilService,private lotsService:LotsService, private activatedRoute :ActivatedRoute,
    private alertify: AlertifyService) {

    this.lotsService.getNumLot().subscribe((res:any) =>{
       this.listNumLot= res;
       console.log(this.listNumLot);
    })

    this.lotsService.getLots().subscribe((data: Lot[]) =>{
      this.listOfLot=data;
      });

   }

  ngOnInit() {
    lotId :Number;
 this.activatedRoute.params.forEach((params:Params)=>{
  console.log(params['id']) ;
  this.lotsService.getLotAppareils(params['id']).subscribe((data:any)=>{
    this.listOfAppareil= data.appareils;
    this.Diametre= data.diA_LOT_APT;
    this.NumLot= data.nuM_LOT_APT;
  }
 )})

   console.log(this.listOfAppareil);
  }

  get diametre(){
    return this.Diametre;
  }

  searchAppareil(num: string){
    this.appareilSearched=[];
    if(num != null){
      this.listOfAppareil.forEach(element => {
        if(element.nuM_PHY_APT == num){
          this.appareilSearched.push(element);
        }
      });
      this.listOfAppareil=this.appareilSearched;
    }

  }

  affecter(numLot: string){
    const requestData = this.listOfAppareil.filter(data => this.setOfCheckedId.has(data.nuM_APT));
    console.log(requestData, requestData);
    this.lotsService.affecterAppareil(numLot, requestData);
    this.alertify.success("Operation est bien effectue");
    this.ngOnInit();
  }

  exportToExcel(){
    let element =document.getElementById('lots-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb,this.fileName);
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
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.nuM_APT, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.nuM_APT, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Appareil[] = [];
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
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.nuM_APT, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly Appareil[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.nuM_APT));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.nuM_APT)) && !this.checked;
  }


}
