import { PostgrestResponse } from "@supabase/supabase-js";
import supabase from "./supabase";
import { ITeam, ITeamMemberDetail } from "../../types/team.type";

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

export async function getTeamList(contestId: number) {
  try {
    const { data, error }: PostgrestResponse<ITeam> = await supabase
      .from("teams")
      .select("*")
      .eq("contest_id", contestId)
      .then((response) => response as PostgrestResponse<ITeam>);
    if (error) {
      console.error("Lỗi get team list: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi get team list: ", error);
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