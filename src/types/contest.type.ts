export type IContest = {
  id: number;
  name: string;
  description: string;
  date_begin: string;
  time_begin: string;
  duration: string;
  host_id: number;
};

export type IContestDashboard = {
  id: number;
  name: string;
  date_begin: string;
  time_begin: string;
  host_name: string;
};

export type IContestForRanking = {
  id: number;
  name: string;
  amount: number;
};
