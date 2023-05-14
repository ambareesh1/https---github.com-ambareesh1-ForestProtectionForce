export interface Seizure_CasesOfMonth_FormC{
        id?: number;
        sno?:number;
        gamma_unit?: string;
        opening_Balance?: number;
        cases_registered_month?: number;
        total?: number;
        disposed_cases_month?: number;
        balance?: number;
        authorized_officer_FD?: number;
        court?: number;
        under_investigation?: number;
        pccf?: number;
        session_Court?  : number,
        high_Court?:number;
        others ?: number,
        provinceId?: number;
        districtId?: number;
        month?: number;
        year?: number;
        lastUpdatedOn?: Date;
        isActive?: boolean;
}