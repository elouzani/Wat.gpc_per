import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Appareil } from '../Model/Appareil';
import { AlertifyService } from '../services/Alertify.service';
import { LotsService } from '../services/Lots.service';

@Component({
  selector: 'app-changement',
  templateUrl: './changement.component.html',
  styleUrls: ['./changement.component.css']
})
export class ChangementComponent implements OnInit {
  listOfAppareil :Array<Appareil>=[];
  listOfAppareilFiltred :Array<Appareil>;
  list:Array<Appareil>=[];
  public Diametre: string;
  public NumLot: string;
  radioValue1:Number;
  radioValue2:Number;

  constructor(private activatedRoute :ActivatedRoute,private lotsService:LotsService,private alertify: AlertifyService) { }

  ngOnInit() {
    this.listOfAppareilFiltred=[];
    this.activatedRoute.params.forEach((params:Params)=>{
      console.log(params['id']) ;
      this.lotsService.getLotAppareils(params['id']).subscribe((data:any)=>{
        // this.listOfAppareil= data.appareils;
        // this.Diametre= data.diA_LOT_APT;
        this.NumLot= data.nuM_LOT_APT;
        console.log(data.appareils);
      }
      )
    })
  }

  getCompteurs(){
    this.activatedRoute.params.forEach((params:Params)=>{
      console.log(params['id']) ;
      this.lotsService.getLotAppareils(params['id']).subscribe((data:any)=>{
        this.listOfAppareil= data.appareils;
        this.Diametre= data.diA_LOT_APT;
        this.NumLot= data.nuM_LOT_APT;
      })
    })
    return this.listOfAppareil;
  }

  lancer(radioValue1,radioValue2){
    this.listOfAppareilFiltred =[];
    var number=0;
    this.list= this.getCompteurs();
    if(this.radioValue2 != null && this.radioValue1== null){

        for(let i=0; i< this.list.length && i< radioValue2 ; i++){
          this.listOfAppareilFiltred.push(this.list[i]);
        }
        console.log('appareils:', this.listOfAppareilFiltred);
    }
    if(this.radioValue2== null && this.radioValue1 != null){
       number =this.list.length*(Number(radioValue1)/100);
      for(let i=0; i< this.list.length && i<number ; i++){
        this.listOfAppareilFiltred.push(this.list[i]);
      }
    }
}

valider(){
  const requestData = this.listOfAppareilFiltred.filter(data => this.setOfCheckedId.has(data.nuM_APT));
  this.lotsService.AddIntervention(requestData).subscribe(res=>{
    if(res =='success'){
      this.alertify.success('Génération Des Interventions Effectué Avec Succès');
    }
    else{
      this.alertify.warning('Veuillez Cocher Des Compteurs à Etalonner ');
    }
  })
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
