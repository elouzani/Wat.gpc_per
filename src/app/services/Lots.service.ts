import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Appareil } from '../Model/Appareil';
import { Lot } from '../Model/lot';
import { Parametrage } from '../Model/parametrage';

@Injectable({
  providedIn: 'root'
})
export class LotsService {
  baseServerUrl = "https://localhost:44378/api/";
constructor(private http : HttpClient) { }

getLots(){
  return this.http.get(this.baseServerUrl + "Lots/ListLots");
}
getLotAppareils(id:number){
  return this.http.get(this.baseServerUrl + "Lots/GetLotWithAppareils/" +id);
}
getLotEvenements(id:number){
  return this.http.get(this.baseServerUrl + "Lots/GetLotWithEvenements/" +id);
}
getEvenmtInter(id: number){
  return this.http.get(this.baseServerUrl + "Evenements/GetEvenementWithIntervention/" +id);
}

getServices(){
  return this.http.get(this.baseServerUrl + "Lots/ListServices");
}
getMarques(){
  return this.http.get(this.baseServerUrl + "Lots/ListMarques");
}
getNumLot(){
  return this.http.get(this.baseServerUrl + "Lots/ListNumLot");
}
AddLot(lot: Array<Lot>){
  return this.http.post(this.baseServerUrl + "Lots/createLot",{
    NUM_LOT_APT :lot[0],
    MRQ_LOT_APT: lot[1],
    DIA_LOT_APT: lot[2],
    SVC_LOT_APT: lot[3],
    NB_CMP_LOT: lot[4],
    FRN_LOT_APT: lot[5],
    COD_MRC_LOT: lot[6],
    QTE_MRC_LOT: lot[7]
  }, {
    responseType: 'text'
  });
 }
 AddResultEtl(q : Array<number>,result: number ){
  return this.http.post(this.baseServerUrl + "ETL_RES/createResEtl" ,{
    ETL_Q1: q[0],
    ETL_Q2: q[1],
    ETL_Q3: q[2],
    ETL_Q4: q[3],
    ETL_Q5: q[4],
    ETL_Q6: q[5],
    RND_CMPT:result,
  });
 }

 AddIntervention(appareils : Array<Appareil>){
  return this.http.post(this.baseServerUrl+ "Interventions/AddIntervention",appareils,{
    responseType:'text'
  });
 }

updateLot(lot :Lot){
  var id =lot.iD_LOT_APT;
return this.http.put<Lot>(this.baseServerUrl + "Lots/PutLot/" +id,
  lot
 );
}

affecterAppareil(numLot: string, appareils:Appareil[]){

 //return this.http.put(this.baseServerUrl + "Lots/AffecterAppareil/" + numLot, appareils);

 return this.http.put(this.baseServerUrl + "Lots/AffecterAppareil/" + numLot,appareils)
.subscribe(result => {

  console.log('OK');
},
error => {

  console.log('error occured');
});

}
getParametrage(){
  return this.http.get(this.baseServerUrl + "Paramétrage/Getparametrages");
}
updatePrametrage(parametre: Parametrage){
  var id =parametre.iD_PAR_VAL;
  return this.http.put<Parametrage>(this.baseServerUrl + "Paramétrage/" +id,
  parametre
   );
}}
