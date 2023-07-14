import supabase from "./supabase";
import { PostgrestResponse } from "@supabase/supabase-js";
import { IAccount, ISimpleAccount, IHost } from "~/types";

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

export async function updateAccountInfo(
  id: number,
  name: string,
  email: string,
  address: string,
  phone: string
): Promise<boolean> {
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
      throw error;
    } else {
      return !!data;
    }
  } catch (error) {
    console.error("updateAccountInfo:", error);
    return false;
  }
}

export async function changePassword(id: number, password: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .update({
        password
      })
      .eq("id", id)
      .select("*");
    if (error) {
      throw error;
    } else {
      return !!data;
    }
  } catch (error) {
    console.error("changePassword: ", error);
    return false;
  }
}

export async function handleLogin(username: string, password: string): Promise<ISimpleAccount> {
  const failResult: ISimpleAccount = {
    id: -1,
    name: ""
  };

  try {
    const { data, error }: PostgrestResponse<ISimpleAccount> = await supabase
      .rpc("handle_login", {
        password_login: password,
        role_login: 2,
        username_login: username
      })
      .then((response) => response as PostgrestResponse<ISimpleAccount>);
    if (error) {
      console.error("handleLogin :", error);
      return failResult;
    } else {
      if (data && data.length !== 0) return data[0];
      else return failResult;
    }
  } catch (error) {
    console.error("handleLogin :", error);
    return failResult;
  }
}

export async function checkEmail(email: string): Promise<IAccount[] | undefined> {
  try {
    const { data, error }: PostgrestResponse<IAccount> = await supabase
      .from("accounts")
      .select("*")
      .eq("email", email)
      .eq("role_id", 2)
      .then((res) => res as PostgrestResponse<IAccount>);
    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("checkEmail: ", error);
    return [];
  }
}
