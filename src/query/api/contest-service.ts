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
    Swal.fire({
      title: "Đang lấy dữ liệu cuộc thi",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen() {
        Swal.showLoading();
      }
    });
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

export async function deleteContest(contestId: number) {
  try {
    const { data, error } = await supabase.from("contests").delete().eq("id", contestId);
    if (error) throw error;
    else return data;
  } catch (error) {
    console.error("Lỗi khi xóa cuộc thi:", error);
  }
}

export async function getContestById(contestId: number) {
  try {
    Swal.fire({
      title: "Đang lấy dữ liệu",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen() {
        Swal.showLoading();
      }
    });
    const { data, error }: PostgrestResponse<IContest> = await supabase
      .from("contests")
      .select("*")
      .eq("id", contestId)
      .then((response) => response as PostgrestResponse<IContest>);
    Swal.close();
    if (error) throw error;
    else return data;
  } catch (error) {
    console.error("Lỗi khi lấy cuộc thi bằng id: ", error);
    Swal.close();
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
