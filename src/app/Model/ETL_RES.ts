import { Intervention } from "./intervention";

export interface ETL_RES {
  id:number;
  etL_Q1 : number;
  etL_Q2 : number;
  etL_Q3 : number;
  etL_Q4 : number;
  etL_Q5 : number;
  etL_Q6 : number;
  num_inter: number;
  rnD_CMPT:number;
  etA_CMPT: string;
  etl_res: Intervention;


}
