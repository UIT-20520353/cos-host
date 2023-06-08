import { IAccount } from "./account.type";

export type ITeam = {
  id: number;
  name: string;
  max_member: number;
  score: number;
  contest_id: number;
};

export type ITeamMember = {
  id: number;
  team_id: number;
  account_id: number;
  is_leader: boolean;
};

type ITemp = {
  accounts: IAccount;
};

export type ITeamMemberDetail = ITeamMember & ITemp;
