import supabase from "./supabase";
import { ITestcase } from "~/types";
import { PostgrestResponse } from "@supabase/supabase-js";

export async function insertTestcase(testcase: ITestcase): Promise<boolean> {
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
      console.error("insertTestcase: ", error);
      return false;
    } else {
      return !!data;
    }
  } catch (error) {
    console.error("insertTestcase: ", error);
    return false;
  }
}

export async function getTestcases(problemId: number): Promise<ITestcase[]> {
  try {
    const { data, error }: PostgrestResponse<ITestcase> = await supabase
      .from("testcases")
      .select("*")
      .eq("problem_id", problemId)
      .order("id", { ascending: true })
      .then((response) => response as PostgrestResponse<ITestcase>);
    if (error) {
      console.error("getTestcases: ", error);
      return [];
    } else {
      if (data) return data;
      else return [];
    }
  } catch (error) {
    console.error("getTestcases: ", error);
    return [];
  }
}

export async function updateTestcase(testcase: ITestcase): Promise<boolean> {
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
      console.error("updateTestcase: ", error);
      return false;
    } else {
      return !!data;
    }
  } catch (error) {
    console.error("updateTestcase: ", error);
    return false;
  }
}

export async function deleteTestcaseById(testcaseId: number): Promise<boolean> {
  try {
    const { error } = await supabase.from("testcases").delete().eq("id", testcaseId);
    if (error) {
      console.error("deleteTestcaseById: ", error);
      return false;
    } else return true;
  } catch (error) {
    console.error("deleteTestcaseById: ", error);
    return false;
  }
}
