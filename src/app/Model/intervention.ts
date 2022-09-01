import { ETL_RES } from "./ETL_RES";
import { Evenement } from "./evenement";

export interface Intervention {
  num_inter: number;
  type_inter:string;
  nuM_PHY_APT:number;
  code_etat:number;
  libelle_etat:string;
  date_lancement:Date;
  date_execution:Date;
  num_evenmt:number;
  evenmt_intervention:Evenement;
  resulta_etl: ETL_RES;
}
