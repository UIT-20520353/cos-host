import { getDateAndTime, getTimeEnd } from "./ValidateDate";

export function checkStatus(date: string, time: string, duration: string): string {
  const current_date = new Date();
  const { year, month, day, hour, minute, second } = getDateAndTime(date, time);

  const time_begin = new Date(year, month, day, hour, minute, second);
  const time_end = getTimeEnd({ year, month, day, hour, minute, second, duration });

  if (time_begin > current_date) return "Chưa bắt đầu";
  else {
    if (time_begin <= current_date && time_end >= current_date) return "Đang diễn ra";
    else {
      return "Đã kết thúc";
    }
  }
}
