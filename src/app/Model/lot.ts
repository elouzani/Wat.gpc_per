import { Appareil } from "./Appareil";
import { Evenement } from "./evenement";

export interface Lot {
  iD_LOT_APT: number;
 nuM_LOT_APT:string ;
 mrQ_LOT_APT :string;
 diA_LOT_APT :number;
 svC_LOT_APT:string;
 nB_CMP_LOT :number;
 frN_LOT_APT :string;
 coD_MRC_LOT :string;
 qtE_MRC_LOT :number ;
 anneE_LOT_APT  :Date;
 isEdit:boolean;
 appareils: Appareil[];
 evenenmts: Evenement[];

}
