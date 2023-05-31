import supabase from "./supabase";
import { PostgrestResponse } from "@supabase/supabase-js";
import { IAccount } from "../../types/account.type";

export const getAccountList = async () => {
  try {
    const { data, error }: PostgrestResponse<IAccount> = await supabase
      .from("accounts")
      .select(`*, roles(*)`)
      .then((response) => response as PostgrestResponse<IAccount>);
    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tài khoản:", error);
  }
};
