export interface ForestFire {
    id: number;
    sno:number;
    province_id: number;
    district_id: number;
    gamma_unit_name: string;
    ob_total_cases: number;
    forest_division_name: string;
    fire_spot: string;
    forest_damage_area: number;
    forest_crop_damaged: string;
    fire_datetime: Date;
    fpf_personnel_name: string;
    total_fire_cases: number;
    month: number;
    year: number;
    date_of_insertion: Date;
    is_active: boolean;
    last_updated_on: Date;
  }
  