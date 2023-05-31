import supabase from "./supabase";
import { IContest } from "../../types/contest.type";
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
    Swal.showLoading();
    const { data, error }: PostgrestResponse<IContest> = await supabase
      .from("contests")
      .select("*")
      .eq("host_id", sessionStorage.getItem("id"))
      .then((response) => response as PostgrestResponse<IContest>);
    Swal.close();
    if (error) throw error;
    else return data;
  } catch (error) {
    console.error("Lỗi khi lấy cuộc thi của tôi:", error);
    Swal.close();
  }
}
