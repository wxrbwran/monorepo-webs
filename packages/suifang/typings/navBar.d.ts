declare interface navBarIMsg {
  body: {
    title: string;
    content: {
      inviterName: string;
      projectName: string;
      projectNsId: string;
      inviterSid: string;
    };
  },
  msg: string;
  id: string;
  type: number;
  updatedAt: number;
  state: number;
}
