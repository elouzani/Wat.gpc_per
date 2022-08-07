import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from '../services/Alertify.service';
import { LotsService } from '../services/Lots.service';

@Component({
  selector: 'app-add-lot',
  templateUrl: './add-lot.component.html',
  styleUrls: ['./add-lot.component.css']
})
export class AddLotComponent implements OnInit {
  addForm: FormGroup;
  constructor( private fb:FormBuilder,private alertify: AlertifyService, private serviceLot: LotsService) { }

  ngOnInit() {
    this.createAddForm();

  }


  onAddition(){
   console.log(this.addForm.value);
   this.serviceLot.AddLot([this.addForm.value.numLot,
    this.addForm.value.marque,
    this.addForm.value.diametre,
    this.addForm.value.service,
    this.addForm.value.nbCompteur,
    this.addForm.value.fournisseur,
    this.addForm.value.code,
    this.addForm.value.qnt,
  ]).subscribe(res => {
    if(res =='success'){
      this.alertify.success('lot bien ajouté');
      this.addForm.reset();
    }else{
      this.alertify.error('erreur, veuillez remplir tous les champs svp');
    }
  })
  }
  changeMarque(e){
    return e.target.value;
    console.log(e.target.value);
  }
  changeService(e){
    return e.target.value;
    console.log(e.target.value);
  }
  get numLot(){
    return this.addForm.get('numLot') as FormControl;
  }
  get marque(){
    return this.addForm.get('marque') as FormControl;
  }
  get diametre(){
    return this.addForm.get('diametre') as FormControl;
  }
  get service(){
    return this.addForm.get('service') as FormControl;
  }
  get nbCompteur(){
    return this.addForm.get('nbCompteur') as FormControl;
  }
  get fournisseur(){
    return this.addForm.get('fournisseur') as FormControl;
  }
  get code(){
    return this.addForm.get('code') as FormControl;
  }
  get qnt(){
    return this.addForm.get('qnt') as FormControl;
  }

  createAddForm(){
    this.addForm= this.fb.group({
      numLot :[null, Validators.required],
      marque: [null, Validators.required],
      diametre: [null, Validators.required],
      service: [null, Validators.required],
      nbCompteur:[null, Validators.required],
      fournisseur :[null],
      code:[null],
      qnt:[null]

    });



  }
}
