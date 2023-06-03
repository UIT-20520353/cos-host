import supabase from "./supabase";
import { ITestcase } from "../../types/testcase.type";

export async function insertTestcase(testcase: ITestcase) {
  try {
    const { data, error } = await supabase
      .from("testcases")
      .insert({
        id: testcase.id,
        input: testcase.input,
        output: testcase.output,
        score: testcase.score,
        problem_id: testcase.problem_id
      })
      .select();

    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("testcase service: ", error);
  }
}

export async function deleteTestcases(problemId: number) {
  try {
    const { data, error } = await supabase.from("testcases").delete().eq("problem_id", problemId);
    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi khi xóa testcase: ", error);
  }
}
