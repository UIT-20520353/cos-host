import supabase from "./supabase";
import { IProblem } from "../../types/problem.type";

export const insertProblem = async (problem: IProblem, contest_id: string) => {
  try {
    const { data, error } = await supabase
      .from("contests")
      .insert({
        name: problem.name,
        detail: problem.detail,
        example_input: problem.example_input,
        example_output: problem.example_output,
        contest_id: contest_id
      })
      .select();

    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi khi thêm bài tập:", error);
  }
};
