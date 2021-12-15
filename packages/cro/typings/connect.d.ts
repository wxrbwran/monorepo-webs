declare interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

declare interface ConnectState {
  workorderStatus: WorkorderModelState;
  messageCount: MessageCountState;
  user: UserModelState;
  auth: AuthModelState;
  institution: InstitutionModelState;
  provinces: ProvincesModelState;
  project: ProjectModelState;
  query: QueryModelState;
  navBar: NavBarState;
}

declare interface Route {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
