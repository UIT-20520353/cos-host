export type IAccount = {
  id: string;
  name: string;
  username: string;
  password: string;
  role_id: string;
  host_id: string;
  roles: IRole;
};

type IRole = {
  id: string;
  name: string;
};
