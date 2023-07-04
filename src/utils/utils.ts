import { useState } from "react";
import { IUser } from "~/types";
import { getDateAndTime, getTimeEnd } from "~/utils/ValidateDate";

export const useSessionStorage = (keyName: string, defaultValue: IUser | null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.sessionStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error("useSessionStorage: ", err);
      return defaultValue;
    }
  });
  const setValue = (newValue: IUser | null) => {
    try {
      window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.error("useSessionStorage: ", err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};

export function getContestStatus(
  date_begin: string,
  time_begin: string,
  duration: string
): { status: string; dateDisplay: string } {
  let status = "";

  const current_date = new Date();
  const { year, month, day, hour, minute, second } = getDateAndTime(date_begin, time_begin);

  const begin = new Date(year, month, day, hour, minute, second);
  const time_end = getTimeEnd({ year, month, day, hour, minute, second, duration });

  if (begin > current_date) status = "Chưa bắt đầu";
  else {
    if (begin <= current_date && time_end >= current_date) status = "Đang diễn ra";
    else {
      status = "Đã kết thúc";
    }
  }
  const dateDisplay = `${day}/${month + 1}/${year}`;

  return { status, dateDisplay };
}

export function getIdFromString(id: string | undefined): number {
  let temp: string[] = [];
  if (id) {
    temp = id.toString().split("-");
  }
  return Number(temp[1]);
}
