import { ISubmission } from "../../types/submission.type";
import supabase from "./supabase";
import { PostgrestResponse } from "@supabase/supabase-js";

export async function getAllSubmission() {
  try {
    const { data, error }: PostgrestResponse<ISubmission> = await supabase
      .from("submissions")
      .select("*")
      .then((response) => response as PostgrestResponse<ISubmission>);
    if (error) {
      console.error("getAllSubmission: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getAllSubmission: ", error);
  }
}
