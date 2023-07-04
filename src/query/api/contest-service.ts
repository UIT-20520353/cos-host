import supabase from "./supabase";
import { IContest, IContestDashboard, IContestForRanking, IDetailContest } from "~/types";
import { PostgrestResponse } from "@supabase/supabase-js";

export const insertContest = async (contest: IContest): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("contests")
      .insert({
        id: contest.id,
        name: contest.name,
        description: contest.description,
        date_begin: contest.date_begin,
        time_begin: contest.time_begin,
        duration: contest.duration,
        host_id: contest.host_id
      })
      .select();

    if (error) {
      console.error("insertContest: ", error);
      return false;
    } else {
      // await new Promise(resolve => setTimeout(resolve, 3000))
      return !!data;
    }
  } catch (error) {
    console.error("insertContest:", error);
    return false;
  }
};

export async function getMyContests(id: number, searchText: string): Promise<IDetailContest[]> {
  try {
    const { data, error }: PostgrestResponse<IDetailContest> = await supabase
      .rpc("get_contest_list", { current_host: id, search_text: searchText })
      .then((response) => response as PostgrestResponse<IDetailContest>);
    if (error) {
      console.error("getMyContests: ", error);
      return [];
    } else {
      if (data) return data;
      else return [];
    }
  } catch (error) {
    console.error("getMyContests:", error);
    return [];
  }
}

export async function getContestsNotStarted(host_id: number): Promise<IContest[]> {
  try {
    const { data, error }: PostgrestResponse<IContest> = await supabase
      .rpc("get_contests_not_started", {
        current_host: host_id
      })
      .then((response) => response as PostgrestResponse<IContest>);
    if (error) {
      console.error("getContestsNotStarted: ", error);
      return [];
    } else {
      if (data) {
        return data;
      } else {
        return [];
      }
    }
  } catch (error) {
    console.error("getContestsNotStarted: ", error);
    return [];
  }
}

export async function deleteContest(contestId: number): Promise<boolean> {
  try {
    const { error } = await supabase.from("contests").delete().eq("id", contestId);
    if (error) {
      console.error("deleteContest: ", error);
      return false;
    } else return true;
  } catch (error) {
    console.error("deleteContest:", error);
    return false;
  }
}

export async function getContestById(contestId: number): Promise<IContest> {
  const failResult: IContest = {
    id: -1,
    name: "",
    description: "",
    date_begin: "",
    time_begin: "",
    duration: "",
    host_id: -1
  };
  try {
    const { data, error }: PostgrestResponse<IContest> = await supabase
      .from("contests")
      .select("*")
      .eq("id", contestId)
      .then((response) => response as PostgrestResponse<IContest>);
    if (error) {
      console.error("getContestById: ", error);
      return failResult;
    } else {
      if (data && data.length !== 0) return data[0];
      else return failResult;
    }
  } catch (error) {
    console.error("getContestById: ", error);
    return failResult;
  }
}

export async function updateContestById(contest: IContest): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("contests")
      .update({
        name: contest.name,
        description: contest.description,
        date_begin: contest.date_begin,
        time_begin: contest.time_begin,
        duration: contest.duration
      })
      .eq("id", contest.id)
      .select();
    if (error) {
      console.error("updateContestById: ", error);
      return false;
    } else {
      return !!data;
    }
  } catch (error) {
    console.error("updateContestById: ", error);
    return false;
  }
}

export async function getContestListDashboard(): Promise<IContestDashboard[]> {
  try {
    const { data, error }: PostgrestResponse<IContestDashboard> = await supabase
      .rpc("get_contest_list_for_dashboard")
      .then((response) => response as PostgrestResponse<IContestDashboard>);
    if (error) {
      console.error("getContestListDashboard: ", error);
      return [];
    } else {
      // await new Promise(resolve => setTimeout(resolve, 3000))
      if (data) return data;
      else return [];
    }
  } catch (error) {
    console.error("getContestListDashboard: ", error);
    return [];
  }
}
export async function getContestsForRanking(): Promise<IContestForRanking[]> {
  try {
    const { data, error }: PostgrestResponse<IContestForRanking> = await supabase
      .rpc("get_contests_for_ranking")
      .then((response) => response as PostgrestResponse<IContestForRanking>);
    if (error) {
      console.error("getContestsForRanking: ", error);
      return [];
    } else {
      if (data) {
        data.sort((a, b) => b.amount - a.amount);
        return data;
      } else return [];
    }
  } catch (error) {
    console.error("getContestsForRanking: ", error);
    return [];
  }
}
