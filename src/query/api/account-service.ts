import supabase from "./supabase";
import { PostgrestResponse } from "@supabase/supabase-js";
import { IAccount } from "../../types/account.type";
import { IHost } from "../../types/host.type";

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

export async function getAccountInfo(account_id: number) {
  try {
    const { data, error }: PostgrestResponse<IAccount> = await supabase
      .from("accounts")
      .select(`*, roles(*)`)
      .eq("id", account_id)
      .then((response) => response as PostgrestResponse<IAccount>);
    if (error) {
      console.error("getAccountInfo:", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getAccountInfo:", error);
  }
}

export async function getInfoHost(host_id: number) {
  try {
    const { data, error }: PostgrestResponse<IHost> = await supabase
      .from("hosts")
      .select("*")
      .eq("id", host_id)
      .then((response) => response as PostgrestResponse<IHost>);
    if (error) {
      console.error("getInfoHost:", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("getInfoHost:", error);
  }
}

export async function updateAccountInfo(id: number, name: string, email: string, address: string, phone: string) {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .update({
        name,
        email,
        address,
        phone
      })
      .eq("id", id)
      .select("*");
    if (error) {
      console.error("updateAccountInfo:", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("updateAccountInfo:", error);
  }
}

export async function changePassword(id: number, password: string) {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .update({
        password
      })
      .eq("id", id)
      .select("*");
    if (error) {
      console.error("changePassword: ", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("changePassword: ", error);
  }
}
