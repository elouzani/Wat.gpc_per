import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { Intervention } from '../Model/intervention';
import { LotsService } from '../services/Lots.service';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.css']
})
export class InterventionsComponent implements OnInit {

  listOfIntervention:Array<Intervention>=[];
  public NumEvenemt:number;
    constructor(private activatedRoute :ActivatedRoute, private lotsService:LotsService) { }

    ngOnInit() {
      this.activatedRoute.params.forEach((params:Params)=>{
        console.log(params['id']) ;
        this.lotsService.getEvenmtInter(params['id']).subscribe((data:any)=>{
          this.listOfIntervention= data.interventions;
          // this.NbCmpt= data.nB_CMP_LOT;
          this.NumEvenemt= data.num_evenmt;
          console.log('interventions:' ,this.listOfIntervention);
        })
      })
    }

    listOfColumn = [
      {
        title: 'N° Intervention',
        compare: (a:Intervention, b: Intervention) => a.num_inter - b.num_inter,
        priority: 1
      },
      {
        title: 'Type Intervention',

      },
      {
        title: 'N° Appareil',

      },
      {
        title: 'Code Etat',

      },
      {
        title: 'Libelle Etat',

      },
      {
        title: 'Date Lancement',

      },
      {
        title: 'Date Execution',

      }
    ];

}
