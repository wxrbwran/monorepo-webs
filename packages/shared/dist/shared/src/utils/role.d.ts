export interface RoleType {
    id: string;
    initState: number;
    accepted: number;
    refused: number;
    desc: string;
    [propName: string]: string | number;
}
interface RolesMap {
    UPPER_DOCTOR: RoleType;
    LOWER_DOCTOR: RoleType;
    ALONE_DOCTOR: RoleType;
    COUNSELOR_DOCTOR: RoleType;
    NURSE: RoleType;
    PATIENT_VIP: RoleType;
    PATIENT: RoleType;
    ORG: RoleType;
    PI: RoleType;
    MAIN_PI: RoleType;
    SUB_PI: RoleType;
    PROJECT_LEADER: RoleType;
    PROJECT_RESEARCHER: RoleType;
    PROJECT_MEMBERS: RoleType;
    [propName: string]: RoleType;
}
export declare const Role: RolesMap;
export declare function fetchRolePropById(id: string): RoleType;
export declare function fetchRolePropValue(id: string, keyName: string): string | number;
export {};
