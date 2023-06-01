import { BiTimeFive, GiDuration, MdDateRange, RiTeamFill } from "react-icons/all";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

type IProps = {
  name: string;
  amount: number;
  date: string;
  time: string;
  id: string;
  isShowAction: boolean;
  duration: string;
};

function OverviewContest(props: IProps) {
  const [status, setStatus] = useState<string>("");
  const [dateDisplay, setDateDisplay] = useState<string>("");

  const getDateAndTime = (date: string, time: string): object => {
    const dateStrings = date.split("-");
    const timeStrings = time.split(":");
    const year = parseInt(dateStrings[0]);
    const month = parseInt(dateStrings[1]) - 1;
    const day = parseInt(dateStrings[2]);
    const hour = parseInt(timeStrings[0]);
    const minute = parseInt(timeStrings[1]);
    const second = parseInt(timeStrings[2]);
    return { year, month, day, hour, minute, second };
  };

  useEffect(() => {
    const current_date = new Date();
    const { year, month, day, hour, minute, second } = getDateAndTime(props.date, props.time);

    const time_begin = new Date(year, month, day, hour, minute, second);
    let time_end: Date;

    switch (props.duration) {
      case "30 phút":
        time_end = new Date(year, month, day, hour, minute + 30, second);
        break;
      case "1 giờ":
        time_end = new Date(year, month, day, hour + 1, minute, second);
        break;
      case "1 giờ 30 phút":
        time_end = new Date(year, month, day, hour + 1, minute + 30, second);
        break;
      case "2 giờ":
        time_end = new Date(year, month, day, hour + 2, minute, second);
        break;
      case "2 giờ 30 phút":
        time_end = new Date(year, month, day, hour + 2, minute + 30, second);
        break;
      case "3 giờ":
        time_end = new Date(year, month, day, hour + 3, minute, second);
        break;
      case "3 giờ 30 phút":
        time_end = new Date(year, month, day, hour + 3, minute + 30, second);
        break;
      case "4 giờ":
        time_end = new Date(year, month, day, hour + 4, minute, second);
        break;
      case "4 giờ 30 phút":
        time_end = new Date(year, month, day, hour + 4, minute + 30, second);
        break;
      case "5 giờ":
        time_end = new Date(year, month, day, hour + 5, minute, second);
        break;
      case "5 giờ 30 phút":
        time_end = new Date(year, month, day, hour + 5, minute + 30, second);
        break;
      default:
        break;
    }

    if (time_begin > current_date) setStatus("Chưa bắt đầu");
    else {
      if (time_begin <= current_date && time_end >= current_date) setStatus("Đang diễn ra");
      else {
        setStatus("Đã kết thúc");
      }
    }
    setDateDisplay(`${day}/${month}/${year}`);
  }, []);

  return (
    <li key={props.id} id={props.id} className={"rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"}>
      <p className={"mb-3 truncate text-lg font-semibold"}>{props.name}</p>
      <span
        className={`rounded-full px-4 py-2 text-sm font-semibold ${
          status === "Đang diễn ra" ? "bg-[#b7e4c7] text-[#081c15]" : ""
        } ${status === "Đã kết thúc" ? "bg-[#ffb3c1] text-[#590d22]" : ""} ${
          status === "Chưa bắt đầu" ? "bg-[#fff2b2] text-[#710000]" : ""
        }`}
      >
        {status}
      </span>
      <div className={"mt-4 flex flex-row items-center gap-x-2"}>
        <RiTeamFill className={"inline-block h-5 w-5 opacity-50"} />
        <span className={"text-sm text-gray-500"}>{props.amount} đội tham gia</span>
      </div>
      <div className={"mt-4 flex flex-row items-center gap-x-2"}>
        <MdDateRange className={"inline-block h-5 w-5 opacity-50"} />
        <span className={"text-sm text-gray-500"}>{dateDisplay}</span>
      </div>
      <div className={"mt-4 flex flex-row items-center gap-x-2"}>
        <BiTimeFive className={"inline-block h-5 w-5 opacity-50"} />
        <span className={"text-sm text-gray-500"}>{props.time}</span>
      </div>
      <div className={"mt-4 flex flex-row items-center gap-x-2"}>
        <GiDuration className={"inline-block h-5 w-5 opacity-50"} />
        <span className={"text-sm text-gray-500"}>{props.duration}</span>
      </div>
      {props.isShowAction && (
        <div className={"mt-4 flex flex-row items-center gap-x-3"}>
          <NavLink
            className={
              "rounded-lg bg-transparent px-4 py-2 text-sm font-semibold text-[#03045e] duration-300 hover:bg-[#48cae4]"
            }
            to={`/manage-contest/${props.id}`}
          >
            Cập nhật
          </NavLink>
          <NavLink
            className={
              "rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black duration-300 hover:bg-black hover:text-white"
            }
            to={`/result-contest/${props.id}`}
          >
            Kết quả
          </NavLink>
        </div>
      )}
    </li>
  );
}

export default OverviewContest;
