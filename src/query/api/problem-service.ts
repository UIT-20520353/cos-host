import supabase from "./supabase";
import { IProblem } from "~/types";
import { PostgrestResponse } from "@supabase/supabase-js";

export const insertProblem = async (problem: IProblem): Promise<boolean> => {
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
      console.error("insertProblem: ", error);
      return false;
    } else {
      return !!data;
    }
  } catch (error) {
    console.error("insertProblem: ", error);
    return false;
  }
};

export async function getProblems(contestId: number): Promise<IProblem[]> {
  try {
    const { data, error }: PostgrestResponse<IProblem> = await supabase
      .from("problems")
      .select("*")
      .eq("contest_id", contestId)
      .then((response) => response as PostgrestResponse<IProblem>);
    if (error) {
      console.error("getProblems: ", error);
      return [];
    } else {
      if (data) return data;
      else return [];
    }
  } catch (error) {
    console.error("getProblems: ", error);
    return [];
  }
}

export async function getProblemById(problemId: number): Promise<IProblem> {
  const failResult: IProblem = {
    id: -1,
    name: "",
    detail: "",
    example_input: "",
    example_output: "",
    contest_id: -1
  };
  try {
    const { data, error }: PostgrestResponse<IProblem> = await supabase
      .from("problems")
      .select("*")
      .eq("id", problemId)
      .then((response) => response as PostgrestResponse<IProblem>);
    if (error) {
      console.error("getProblemById: ", error);
      return failResult;
    } else {
      if (data && data.length !== 0) return data[0];
      else return failResult;
    }
  } catch (error) {
    console.error("getProblemById: ", error);
    return failResult;
  }
}

export async function deleteProblem(problemId: number): Promise<boolean> {
  try {
    const { error } = await supabase.from("problems").delete().eq("id", problemId);
    if (error) {
      console.error("deleteProblem: ", error);
      return false;
    } else return true;
  } catch (error) {
    console.error("deleteProblem: ", error);
    return false;
  }
}

export async function updateProblem(problem: IProblem): Promise<boolean> {
  try {
    const { error } = await supabase
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
      console.error("updateProblem: ", error);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("updateProblem: ", error);
    return false;
  }
}

export async function getAllProblems(): Promise<IProblem[]> {
  try {
    const { data, error }: PostgrestResponse<IProblem> = await supabase
      .from("problems")
      .select("*")
      .then((response) => response as PostgrestResponse<IProblem>);
    if (error) {
      console.error("getAllProblems: ", error);
      return [];
    } else {
      if (data) return data;
      else return [];
    }
  } catch (error) {
    console.error("getAllProblems: ", error);
    return [];
  }
}

export async function countProblemByContestId(contest_id: number): Promise<number> {
  try {
    const { data, error } = await supabase.from("problems").select("*").eq("contest_id", contest_id);
    if (error) {
      console.error("countProblemByContestId: ", error);
      return 0;
    } else {
      if (data && data.length !== 0) return data.length;
      else return 0;
    }
  } catch (error) {
    console.error("countProblemByContestId: ", error);
    return 0;
  }
}
