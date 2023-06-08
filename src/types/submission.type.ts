export type IResponseSubmission = {
  data: IData;
};

export type IData = {
  error: string;
  info: string;
  language: string;
  output: string;
  status: number;
  timeStamp: number;
};

export type ISubmission = {
  id: number;
  code: string;
  status: string;
  language: string;
  date_submit: string;
  time_submit: string;
  problem_id: number;
  account_id: number;
};
