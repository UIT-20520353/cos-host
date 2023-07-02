export type IAccount = {
  id: number;
  name: string;
  username: string;
  password: string;
  role_id: number;
  host_id: number;
  roles: IRole;
  email: string;
  address: string;
  phone: string;
};

type IRole = {
  id: number;
  name: string;
};

export type IFormProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  nameHost: string;
  phoneHost: string;
  addressHost: string;
  emailHost: string;
};

export type IFormChangePassword = {
  oldPassword: string;
  newPassword: string;
  rePassword: string;
};

export interface ISimpleAccount {
  id: number;
  name: string;
}
