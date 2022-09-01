import { Component, OnInit } from '@angular/core';
import { Parametrage } from '../Model/parametrage';
import { LotsService } from '../services/Lots.service';

@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.css']
})
export class ParametrageComponent implements OnInit {
  diametre: number;
  listOfparametrages: Parametrage[]=[];
  diamétreSearched: Parametrage[]=[];
  constructor(private lotsService : LotsService) { }

  ngOnInit() {
    this.lotsService.getParametrage().subscribe((res: Parametrage[]) => {
      this.listOfparametrages= res;
      console.log(this.listOfparametrages);
      this.listOfparametrages.forEach(l =>{
        l.isEdit=false;

     });
    })
  }

  listOfColumn = [
    {
      title: 'Diamétre',
      compare: (a: Parametrage, b: Parametrage) => a.diA_PAR - b.diA_PAR,
      priority: 1
    },
    {
      title: 'Libelle Q',
      compare:  null,
      priority: false
    },
    {
      title: 'Valeur',

      compare: (a: Parametrage, b: Parametrage) => a.vaL_QET - b.vaL_QET,
      priority: 2
    },
    {
      title: 'Valeur Minimale',
      compare: (a: Parametrage, b: Parametrage)=> a.vaL_MIN- b.vaL_MIN,
      priority: 3
    },
    {
      title: 'Valeur Maximale',
      compare: (a: Parametrage, b: Parametrage) => a.vaL_MAX - b.vaL_MAX,
      priority: 4
    },
    {
      title: 'Valeur Blocage',
      compare: (a: Parametrage, b:Parametrage)=> a.vaL_BLC -b.vaL_BLC,
      priority: 5
    },

  ];

  onEdit(item :any){
    this.listOfparametrages.forEach(l => {
      l.isEdit=false;
    });
   item.isEdit= true;
  }

  onSave(data: Parametrage){
    this.lotsService.updatePrametrage(data).subscribe((res:any)=>{
      console.log(res);
      this.listOfparametrages;
      data.isEdit=false;
    }
    );
  }
  onCancel(){
    this.lotsService.getParametrage().subscribe((res: Parametrage[]) => {
      this.listOfparametrages= res;
      console.log(this.listOfparametrages);
      this.listOfparametrages.forEach(l =>{
        l.isEdit=false;

     });
    })

  }
  searchDiametre(dia : number){

    if(dia != null){
      this.listOfparametrages.forEach(element => {
        if(element.diA_PAR == dia){
         this.diamétreSearched.push(element);
        }
      });
      this.listOfparametrages=this.diamétreSearched;
    }
  }

}
