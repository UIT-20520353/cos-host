import supabase from "./supabase";
import { ITestcase } from "../../types/testcase.type";
import { PostgrestResponse } from "@supabase/supabase-js";

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
      console.error("testcase service: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("testcase service: ", error);
  }
}

export async function getTestcases(problemId: number) {
  try {
    const { data, error }: PostgrestResponse<ITestcase> = await supabase
      .from("testcases")
      .select("*")
      .eq("problem_id", problemId)
      .then((response) => response as PostgrestResponse<ITestcase>);
    if (error) throw error;
    else return data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu testcases: ", error);
  }
}

export async function updateTestcase(testcase: ITestcase) {
  try {
    const { data, error } = await supabase
      .from("testcases")
      .update({
        input: testcase.input,
        output: testcase.output
      })
      .eq("id", testcase.id)
      .select();
    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin testcase: ", error);
  }
}

export async function deleteTestcaseById(testcaseId: number) {
  try {
    const { data, error } = await supabase.from("testcases").delete().eq("id", testcaseId);
    if (error) throw error;
    else return data;
  } catch (error) {
    console.error("Lỗi khi xóa testcase: ", error);
  }
}
