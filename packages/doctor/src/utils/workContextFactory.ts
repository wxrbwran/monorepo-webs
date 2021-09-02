/*
 * @Author: gaoxue
 * @Date: 2020-10-20 13:34:07
 */
interface INs {
  id?: string;
  name?: string;
  labels?: string[];
  superNsIds?: string[];
  status?: number;
}
interface IRsConfig {
  rscId?: string;
  status?: string;
  account?: string;
  password?: string;
}
interface ISubject {
  id?: string;
  name?: string;
  avatarUrl?: string;
  tel?: string;
}
interface IInterval {
  start?: number;
  end?: number;
}
interface IRole {
  id?: string;
  name?: string;
  labels?: string[];
  interval?: IInterval;
  rsConfig?: IRsConfig;
  subject?: ISubject;
}
class WorkContext {
  // 对当前上下文（操作的目标上下文）进行实例初始化
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  private wcId?: string;

  private ns!: INs;

  private roles!: IRole[];

  public withWcId(value: string) {
    this.wcId = value;
    return this;
  }

  public withNs() {
    if (!this.ns) {
      this.ns = {};
    }
    return this;
  }

  public withNsId(value: string) {
    this.withNs();
    this.ns.id = value;
    return this;
  }

  public withNsName(value: string) {
    this.withNs();
    this.ns.name = value;
    return this;
  }

  public withNsLabels(value: string) {
    this.withNs();
    if (!this.ns.labels) {
      this.ns.labels = [value];
    } else {
      this.ns.labels?.push(value);
    }
    return this;
  }

  public withNsSuperNsIds(value: string) {
    this.withNs();
    if (!this.ns.superNsIds) {
      this.ns.superNsIds = [value];
    } else {
      this.ns.superNsIds?.push(value);
    }
    return this;
  }

  public withNsStatus(value: number) {
    this.withNs();
    this.ns.status = value;
    return this;
  }

  public withRole() {
    if (!this.roles) {
      this.roles = [{}];
    }
    return this;
  }

  public withRoleEnd() {
    if (JSON.stringify(this.roles[0]) !== '{}') { // 避免添加多个空的roleItem
      this.roles.unshift({});
    }
    return this;
  }

  public withRoleId(value: string) {
    this.withRole();
    this.roles[0].id = value;
    return this;
  }

  public withRoleName(value: string) {
    this.withRole();
    this.roles[0].name = value;
    return this;
  }

  public withRoleLabels(value: string) {
    this.withRole();
    if (!this.roles[0].labels) {
      this.roles[0].labels = [value];
    } else {
      this.roles[0].labels?.push(value);
    }
    return this;
  }

  public withRoleInterval() {
    if (!this.roles[0].interval) {
      this.roles[0].interval = {};
    }
    return this;
  }

  public withRoleIntervalStart(value: number) {
    this.withRoleInterval();
    (this.roles[0].interval as IInterval).start = value;
    return this;
  }

  public withRoleIntervalEnd(value: number) {
    this.withRoleInterval();
    (this.roles[0].interval as IInterval).end = value;
    return this;
  }

  public withRoleSubject() {
    if (!this.roles[0].subject) {
      this.roles[0].subject = {};
    }
    return this;
  }

  public withRoleSubjectId(value: string) {
    this.withRoleSubject();
    (this.roles[0].subject as ISubject).id = value;
    return this;
  }

  public withRoleSubjectName(value: string) {
    this.withRoleSubject();
    (this.roles[0].subject as ISubject).name = value;
    return this;
  }

  public withRoleSubjectAvatarUrl(value: string) {
    this.withRoleSubject();
    (this.roles[0].subject as ISubject).avatarUrl = value;
    return this;
  }

  public withRoleSubjectTel(value: string) {
    this.withRoleSubject();
    (this.roles[0].subject as ISubject).tel = value;
    return this;
  }

  public withRoleRsConfig() {
    if (!this.roles[0].rsConfig) {
      this.roles[0].rsConfig = {};
    }
    return this;
  }

  public withRoleRsCAccount(value: string) {
    this.withRoleRsConfig();
    (this.roles[0].rsConfig as IRsConfig).account = value;
    return this;
  }

  public withRoleRsCPassword(value: string) {
    this.withRoleRsConfig();
    (this.roles[0].rsConfig as IRsConfig).password = value;
    return this;
  }

  public withRoleRsCStatus(value: string) {
    this.withRoleRsConfig();
    (this.roles[0].rsConfig as IRsConfig).status = value;
    return this;
  }
}
export default WorkContext;
