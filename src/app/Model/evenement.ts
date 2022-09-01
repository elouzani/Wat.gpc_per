import { Intervention } from "./intervention";
import { Lot } from "./lot";

export interface Evenement {
  num_evenmt: number;
  num_lot : string;
  type_evenmt:string;
  date_evenmt :Date;
  nbr_cmpt: number;
  perte_evenmt? : number;
  iD_LOT_APT: number;
  lotevenmt: Lot;
  interventions: Intervention[]


}
