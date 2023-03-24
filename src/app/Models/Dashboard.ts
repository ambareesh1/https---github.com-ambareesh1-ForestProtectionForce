import { BaselineModel } from "./BaselineModel";

export interface Dashboard {
    boxModels: BoxModel[] | null;
    charts: Chart[] | null;
    baseline: BaselineModel[] | null;
  }
  
  export interface BoxModel {
    name: string | null;
    count: number | null;
  }
  
  export interface Chart {
    name : string |null;
    xaxis: string | null;
    yaxis: string | null;
  }
  