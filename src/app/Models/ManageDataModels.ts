export interface Province {
    id: number;
    name: string;
    isActive: boolean;
  }

  export interface CircleView {
    id: number;
    name: string;
    provinceId: number;
    isActive: boolean;
    province : Province
  }

  export interface Circle {
    id: number;
    name: string;
    provinceId: number;
    isActive: boolean
  }

  export interface DistrictView {
    id: number;
    name: string;
    circleId: number;
    isActive: boolean;
    circle : Circle
  }



  export interface District {
    id: number;
    name: string;
    circleId: number;
    isActive: boolean;
  }

  export interface DivisionView {
    id: number;
    name: string;
    districtId: number;
    isActive: boolean;
    district : District
  }

  export interface Division {
    id: number;
    name: string;
    districtId: number;
    isActive: boolean;
  }

  export interface CompartmentView {
    id: number;
    name: string;
    divisionId: number;
    isActive: boolean;
    division : Division
  }

  export interface Compartment {
    id: number;
    name: string;
    divisionId: number;
    isActive: boolean;
  }
    