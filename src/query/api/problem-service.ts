import supabase from "./supabase";
import { IProblem } from "../../types/problem.type";
import { PostgrestResponse } from "@supabase/supabase-js";

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
    const { data, error }: PostgrestResponse<IProblem> = await supabase
      .from("problems")
      .select("*")
      .eq("contest_id", contestId)
      .then((response) => response as PostgrestResponse<IProblem>);
    if (error) throw error;
    else return data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu problems: ", error);
  }
}

export async function getProblemById(problemId: number) {
  try {
    const { data, error }: PostgrestResponse<IProblem> = await supabase
      .from("problems")
      .select("*")
      .eq("id", problemId)
      .then((response) => response as PostgrestResponse<IProblem>);
    if (error) console.error("getProblemById: ", error);
    else return data;
  } catch (error) {
    console.error("getProblemById: ", error);
  }
}

export async function deleteProblem(problemId: number) {
  try {
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
