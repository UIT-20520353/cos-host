import { createAction, createReducer } from "@reduxjs/toolkit";
import { IContest } from "../types/contest.type";

const initialState: IContest[] = [];

export const addContest = createAction<IContest>("contest/add");
export const addAllContests = createAction<IContest[]>("contest/addAll");

const contestReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addContest, (state, action) => {
      const contest = action.payload;
      state.push(contest);
    })
    .addCase(addAllContests, (state, action) => {
      const contests = action.payload;
      contests.forEach((contest) => {
        state.push(contest);
      });
    });
});

export default contestReducer;
