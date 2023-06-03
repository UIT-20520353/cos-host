import supabase from "./supabase";
import { IProblem } from "../../types/problem.type";
import { PostgrestResponse } from "@supabase/supabase-js";
import Swal from "sweetalert2";
import { deleteTestcases } from "./textcase-service";

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

export async function getProblems(contestId: number) {
  try {
    Swal.fire({
      title: "Đang lấy dữ liệu đề thi",
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
    console.error("Lỗi khi lấy dữ liệu problems: ", error);
    Swal.close();
  }
}

export async function getProblemById(problemId: number) {
  try {
    Swal.fire({
      title: "Đang lấy dữ liệu đề thi",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen() {
        Swal.showLoading();
      }
    });
    const { data, error }: PostgrestResponse<IProblem> = await supabase
      .from("problems")
      .select("*")
      .eq("id", problemId)
      .then((response) => response as PostgrestResponse<IProblem>);
    Swal.close();
    if (error) throw error;
    else return data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu problem bằng id: ", error);
    Swal.close();
  }
}

export async function deleteProblem(problemId: number) {
  try {
    await deleteTestcases(problemId);
    const { data, error } = await supabase.from("problems").delete().eq("id", problemId);
    if (error) throw error;
    else return data;
  } catch (error) {
    console.error("Lỗi khi xóa problem: ", error);
  }
}

export async function updateProblem(problem: IProblem) {
  try {
    const { data, error } = await supabase
      .from("problems")
      .update({
        name: problem.name,
        detail: problem.detail,
        example_input: problem.example_input,
        example_output: problem.example_output
      })
      .eq("id", problem.id)
      .select();
    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin đề thi: ", error);
  }
}
