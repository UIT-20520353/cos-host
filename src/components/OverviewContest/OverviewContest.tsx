import { BiTimeFive, MdDateRange, RiTeamFill } from "react-icons/all";
import { NavLink } from "react-router-dom";

type IProps = {
  name: string;
  amount: number;
  date: string;
  time: string;
  id: string;
  isShowAction: boolean;
};

function OverviewContest(props: IProps) {
  let status: string;
  if (props.amount === 32) status = "Đang diễn ra";
  else if (props.amount === 25) status = "Đã kết thúc";
  else status = "Chưa bắt đầu";

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
        <span className={"text-sm text-gray-500"}>{props.date}</span>
      </div>
      <div className={"mt-4 flex flex-row items-center gap-x-2"}>
        <BiTimeFive className={"inline-block h-5 w-5 opacity-50"} />
        <span className={"text-sm text-gray-500"}>{props.time}</span>
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
