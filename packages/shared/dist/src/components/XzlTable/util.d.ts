declare const handlePatientsTeamDataSource: (data: Store[]) => CommonData[];
export declare const handleInviteMemberList: (dataSource: Store[]) => Partial<ISub>[];
export declare const handleTableDataSource: (dataKey: string, dataSource: Store[], category?: string) => any[];
export declare const handleTableRowKey: (dataKey: string, record: Store) => string;
export default handlePatientsTeamDataSource;
