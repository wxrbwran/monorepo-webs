declare const handlePatientsTeamDataSource: (data: Store[]) => CommonData[];
export declare const handleInviteMemberList: (dataSource: Store[]) => any[];
export declare const handleTeamInviteMemberList: (dataSource: Store[]) => any[];
export declare const handlePersonnewList: (dataSource: Store[]) => any[];
export declare const handleRelatedDoctorsDataSource: (dataSource: Store[]) => any[];
export declare const handleTableDataSource: (dataKey: string, dataSource: Store[], category?: string) => any[];
export declare const handleTableRowKey: (dataKey: string, record: Store) => string;
export default handlePatientsTeamDataSource;
