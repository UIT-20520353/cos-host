import supabase from "./supabase";
import { IProblem } from "../../types/problem.type";
import { PostgrestResponse } from "@supabase/supabase-js";
import Swal from "sweetalert2";

export const insertProblem = async (problem: IProblem) => {
  try {
    const { data, error } = await supabase
      .from("problems")
      .insert({
        name: problem.name,
        detail: problem.detail,
        example_input: problem.example_input,
        example_output: problem.example_output,
        contest_id: problem.contest_id
      })
      .select();

    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi khi thêm bài tập: ", error);
  }
};

export async function getProblems(contestId: string) {
  try {
    Swal.fire({
      title: "Đang lấy dữ liệu",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen() {
        Swal.showLoading();
      }
    });
    const { data, error }: PostgrestResponse<IProblem> = await supabase
      .from("problems")
      .select("*")
      .eq("contest_id", contestId)
      .then((response) => response as PostgrestResponse<IProblem>);
    Swal.close();
    if (error) throw error;
    else return data;
  } catch (error) {
    console.log("Lỗi khi lấy dữ liệu problems: ", error);
  }
}
