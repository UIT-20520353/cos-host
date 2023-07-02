import supabase from "./supabase";
import { IContest, IContestDashboard, IContestForRanking } from "../../types/contest.type";
import Swal from "sweetalert2";
import { PostgrestResponse } from "@supabase/supabase-js";

export const insertContest = async (contest: IContest) => {
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
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi khi thêm cuộc thi:", error);
  }
};

export async function getMyContests() {
  try {
    const { data, error }: PostgrestResponse<IContest> = await supabase
      .from("contests")
      .select("*")
      .eq("host_id", sessionStorage.getItem("id"))
      .then((response) => response as PostgrestResponse<IContest>);
    if (error) throw error;
    else return data;
  } catch (error) {
    console.error("Lỗi khi lấy cuộc thi của tôi:", error);
  }
}

export async function deleteContest(contestId: number): Promise<boolean | undefined> {
  try {
    const { error } = await supabase.from("contests").delete().eq("id", contestId);
    if (error) {
      console.error("deleteContest: ", error);
      return false;
    } else return true;
  } catch (error) {
    console.error("Lỗi khi xóa cuộc thi:", error);
  }
}

export async function getContestById(contestId: number) {
  try {
    const { data, error }: PostgrestResponse<IContest> = await supabase
      .from("contests")
      .select("*")
      .eq("id", contestId)
      .then((response) => response as PostgrestResponse<IContest>);
    if (error) throw error;
    else return data;
  } catch (error) {
    console.error("Lỗi khi lấy cuộc thi bằng id: ", error);
  }
}

export async function updateContestById(contest: IContest) {
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
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin cuộc thi: ", error);
    Swal.close();
  }
}

export async function getContestListDashboard() {
  try {
    const { data, error }: PostgrestResponse<IContestDashboard> = await supabase
      .rpc("get_contest_list_for_dashboard")
      .then((response) => response as PostgrestResponse<IContestDashboard>);
    if (error) {
      console.error("getContestListDashboard: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getContestListDashboard: ", error);
  }
}
export async function getContestsForRanking() {
  try {
    const { data, error }: PostgrestResponse<IContestForRanking> = await supabase
      .rpc("get_contests_for_ranking")
      .then((response) => response as PostgrestResponse<IContestForRanking>);
    if (error) {
      console.error("getContestsForRanking: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getContestsForRanking: ", error);
  }
}
