interface IGroupMsgPatient {
  id: string;
  name: string;
  avatar: string | null;
}

declare interface IGroupMsg {
  id: string;
  staffId: string;
  staffName: string | null;
  staffRole: string | null;
  organizationId: string | null;
  content: string;
  images: string[] | null;
  createdAt: number;
  patients: IGroupMsgPatient[];
}
