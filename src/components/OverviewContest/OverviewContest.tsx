import { BiTimeFive, GiDuration, MdDateRange, RiTeamFill } from "react-icons/all";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteContest } from "../../query/api/contest-service";
import Swal from "sweetalert2";
import { getDateAndTime, getTimeEnd } from "../../utils/ValidateDate/ValidateDate";

type IProps = {
  name: string;
  amount: number;
  date: string;
  time: string;
  id: string;
  isShowAction: boolean;
  duration: string;
  updateContestList: () => void;
};

function OverviewContest(props: IProps) {
  const [status, setStatus] = useState<string>("");
  const [dateDisplay, setDateDisplay] = useState<string>("");

  useEffect(() => {
    const current_date = new Date();
    const { year, month, day, hour, minute, second } = getDateAndTime(props.date, props.time);

    const time_begin = new Date(year, month, day, hour, minute, second);
    const time_end = getTimeEnd({ year, month, day, hour, minute, second, duration: props.duration });

    if (time_begin > current_date) setStatus("Chưa bắt đầu");
    else {
      if (time_begin <= current_date && time_end >= current_date) setStatus("Đang diễn ra");
      else {
        setStatus("Đã kết thúc");
      }
    }
    setDateDisplay(`${day}/${month + 1}/${year}`);
  }, []);

  const handleDeleteContest = () => {
    const temp = props.id.split("-");
    const contestId = parseInt(temp[1]);

    Swal.fire({
      title: "Xóa cuộc thi",
      text: "Xóa tất cả thông tin về cuộc thi này?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContest(contestId).then((response) => {
          console.log(response);
          Swal.fire({
            position: "center",
            timer: 5000,
            icon: "success",
            showConfirmButton: true,
            title: "Xóa cuộc thi thành công"
          });
          props.updateContestList();
        });
      }
    });
  };

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
          {status !== "Đã kết thúc" && status !== "Đang diễn ra" && (
            <NavLink
              className={
                "w-32 rounded-lg bg-[#0077b6] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70"
              }
              to={`/manage-contest/${props.id}`}
            >
              Cập nhật
            </NavLink>
          )}
          {status !== "Đang diễn ra" && (
            <button
              className={
                "w-32 rounded-lg bg-[#d00000] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70"
              }
              onClick={handleDeleteContest}
            >
              Xóa cuộc thi
            </button>
          )}
          {status != "Chưa bắt đầu" && (
            <NavLink
              className={
                "w-32 rounded-lg bg-gray-700 px-4 py-2 text-center text-center text-sm font-semibold text-white duration-300 hover:bg-gray-500 hover:text-white"
              }
              to={`/result-contest/${props.id}`}
            >
              Kết quả
            </NavLink>
          )}
        </div>
      )}
    </li>
  );
}

export default OverviewContest;
