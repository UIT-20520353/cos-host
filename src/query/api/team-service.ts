import { PostgrestResponse } from "@supabase/supabase-js";
import supabase from "./supabase";
import { ITeam, ITeamMemberDetail, ITeamRank } from "../../types/team.type";
import { IDataRankContest } from "~/query";

export async function getTeamListByContestIds(contestId: number[]) {
  try {
    const { data, error }: PostgrestResponse<ITeam> = await supabase
      .from("teams")
      .select("*")
      .in("contest_id", contestId)
      .then((response) => response as PostgrestResponse<ITeam>);
    if (error) {
      console.error("getTeamList: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getTeamList: ", error);
  }
}

export async function getTeamList(contestId: number): Promise<ITeam[]> {
  try {
    const { data, error }: PostgrestResponse<ITeam> = await supabase
      .from("teams")
      .select("*")
      .eq("contest_id", contestId)
      .then((response) => response as PostgrestResponse<ITeam>);
    if (error) {
      console.error("getTeamList: ", error);
      return [];
    } else {
      if (data) return data;
      else return [];
    }
  } catch (error) {
    console.error("getTeamList: ", error);
    return [];
  }
}

export async function getTeamMember(teamIds: number[]) {
  try {
    const { data, error }: PostgrestResponse<ITeamMemberDetail> = await supabase
      .from("team_members")
      .select(`*, accounts("*")`)
      .in("team_id", teamIds)
      .then((response) => response as PostgrestResponse<ITeamMemberDetail>);
    if (error) {
      console.error("Lỗi get team member: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi get team member: ", error);
  }
}
export async function getTeamMemberByTeamId(teamId: number) {
  try {
    const { data, error }: PostgrestResponse<ITeamMemberDetail> = await supabase
      .from("team_members")
      .select(`*, accounts("*")`)
      .eq("team_id", teamId)
      .then((response) => response as PostgrestResponse<ITeamMemberDetail>);
    if (error) {
      console.error("getTeamMemberByTeamId: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getTeamMemberByTeamId: ", error);
  }
}

export async function deleteTeamById(teamId: number) {
  try {
    const { data, error } = await supabase.from("teams").delete().eq("id", teamId);
    if (error) {
      console.error("deleteTeamById: ", error);
      return false;
    } else {
      return data ?? true;
    }
  } catch (error) {
    console.error("deleteTeamById: ", error);
  }
}

export async function getTeamRanks(contest_id: number): Promise<ITeamRank[]> {
  try {
    const { data, error }: PostgrestResponse<ITeamRank> = await supabase
      .rpc("calculate_team_ranks", { id_query: contest_id })
      .then((response) => response as PostgrestResponse<ITeamRank>);
    if (error) {
      console.error("getTeamRanks: ", error);
      return [];
    } else {
      if (data) return data;
      else return [];
    }
  } catch (error) {
    console.error("getTeamRanks: ", error);
    return [];
  }
}

export async function getRankContest(contestId: number): Promise<IDataRankContest[]> {
  const { data, error }: PostgrestResponse<IDataRankContest> = await supabase
    .rpc("get_rank_contest", { contestid: contestId })
    .then((response) => response as PostgrestResponse<IDataRankContest>);
  if (error) {
    throw error;
  } else {
    if (data && data.length !== 0) return data;
    else return [];
  }
}