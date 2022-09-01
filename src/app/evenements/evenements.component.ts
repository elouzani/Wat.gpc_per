import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Appareil } from '../Model/Appareil';
import { Evenement } from '../Model/evenement';
import { LotsService } from '../services/Lots.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.css']
})
export class EvenementsComponent implements OnInit {
  listOfEvenement :Array<Evenement>=[];
  requestData: Array<Evenement>=[];
  public NumLot: string;
  public NbCmpt: number;
  public idEvnmt: number;
  fileName= 'ExcelSheet.xlsx';

  constructor(private activatedRoute :ActivatedRoute, private lotsService:LotsService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params:Params)=>{
      console.log(params['id']) ;
      this.lotsService.getLotEvenements(params['id']).subscribe((data:any)=>{
        this.listOfEvenement= data.evenenmts;
        // this.NbCmpt= data.nB_CMP_LOT;
        this.NumLot= data.nuM_LOT_APT;
        console.log('evenements:' ,this.listOfEvenement);
      })
    })
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
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.num_evenmt, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.num_evenmt, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Evenement[] = [];
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
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.num_evenmt, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly Evenement[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.num_evenmt));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.num_evenmt)) && !this.checked;
  }

  saisirEtalonnage(){
    this.requestData = this.listOfEvenement.filter(data => this.setOfCheckedId.has(data.num_evenmt));
    // this.idLot= this.requestData.map(i => i.iD_LOT_APT);
    this.requestData.forEach(element => {
      this.idEvnmt= element.num_evenmt;
    });
    console.log(this.idEvnmt);
    this.router.navigate(['/saisirETL',this.idEvnmt]);
  }


}
