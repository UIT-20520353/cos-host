import supabase from "./supabase";

export const getAccountList = async () => {
  try {
    const { data, error } = await supabase.from("accounts").select(`*, roles(*)`);
    if (error) {
      throw error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tài khoản:", error);
  }
};
