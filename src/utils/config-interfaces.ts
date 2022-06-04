export interface IDefault {
  service: {
    name: string;
    port: number;
    databases: {
      main: {
        dialect: string;
        host: string;
        port: number;
        dbName: string;
        user: string;
        password: string;
      };
    };
    jwt: {};
    external: {
      'sr-email': string;
    };
  };
  metadata: {
    enviroment: string;
    cookie: {
      domain: '';
      sameSite: string;
      httpOnly: string;
    };
  };
}

export interface IConfig {
  default: IDefault;
}
