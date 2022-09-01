import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ETL_RES } from '../Model/ETL_RES';
import { Evenement } from '../Model/evenement';
import { Intervention } from '../Model/intervention';
import { AlertifyService } from '../services/Alertify.service';
import { LotsService } from '../services/Lots.service';

@Component({
  selector: 'app-saisir-etalonnage',
  templateUrl: './saisir-etalonnage.component.html',
  styleUrls: ['./saisir-etalonnage.component.css']
})
export class SaisirEtalonnageComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute, private lotsService: LotsService,private alertify: AlertifyService) { }
  listOfInterventionResETL: Intervention[]=[];
  public ResultaEtl :ETL_RES;
  editId: number | null = null;
  public numLot: string;
  public numEvenemt : number;
  public Q1: number;
  public Q2: number;
  public Q3: number;
  public Q4: number;
  public Q5: number;
  public Q6: number;
  val_Res: number;


  ngOnInit() {
    this.activatedRoute.params.forEach((params:Params)=>{
      console.log(params['id']) ;
      this.lotsService.getEvenmtInter(params['id']).subscribe((data:any)=>{
        this.numLot=data.num_lot;
        this.numEvenemt=data.num_evenmt;
        this.listOfInterventionResETL= data.interventions;
        this.listOfInterventionResETL.forEach(element => {
          this.ResultaEtl=element.resulta_etl;
        });
        console.log('interventions:' ,this.listOfInterventionResETL);
        console.log('Resultat:' ,this.ResultaEtl);
        console.log('data',data.interventions[0].resulta_etl);
      })
    })
  }

  startEdit(id: number): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }
  enregistrer(){
  this.val_Res =(this.Q1+this.Q2+ this.Q3+this.Q4+this.Q5+this.Q6)/6;
  this.lotsService.AddResultEtl([this.Q1,this.Q2,this.Q3,this.Q4,this.Q5,this.Q6],this.val_Res);
  }

}
