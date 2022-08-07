import { Lot } from "./lot";

export interface Appareil {
  nuM_APT: number;
  nuM_PHY_APT: string;
  daT_POS_APT:Date;
  daT_DEPO_APT:Date;
  etA_APT:string;
  lotCompteur:Lot;

}
