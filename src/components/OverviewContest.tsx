import { BiTimeFive, GiDuration, MdDateRange, RiTeamFill } from "react-icons/all";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteContest } from "~/query";
import Swal from "sweetalert2";
import { getContestStatus } from "~/utils";
import { IDetailContest } from "~/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type IProps = {
  contest: IDetailContest;
  id: string;
  isShowAction: boolean;
  updateContestList: () => void;
  isOverviewForManageTeam: boolean;
};

function OverviewContest(props: IProps) {
  const [dateDisplay, setDateDisplay] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const { status, dateDisplay } = getContestStatus(
      props.contest.date_begin,
      props.contest.time_begin,
      props.contest.duration
    );
    setStatus(status);
    setDateDisplay(dateDisplay);
  }, [props.contest.date_begin, props.contest.time_begin, props.contest.duration]);

  const { mutate: mutateDelete } = useMutation({
    mutationFn: (body: number) => {
      return deleteContest(body);
    },
    onSuccess: (response: boolean) => {
      if (response) {
        toast("Xóa cuộc thi thành công", {
          type: "success",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
        props.updateContestList();
      } else {
        toast("Xảy ra lỗi khi xóa cuộc thi", {
          type: "error",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
      }
    }
  });

  const handleDeleteContest = () => {
    Swal.fire({
      titleText: `Xóa cuộc thi ${props.contest.name}`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        mutateDelete(props.contest.id);
      }
    });
  };

  return (
    <li key={props.id} id={props.id} className={"rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"}>
      <p className={"mb-3 truncate text-lg font-semibold"}>{props.contest.name}</p>
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
        <span className={"text-sm text-gray-500"}>{props.contest.amount} đội tham gia</span>
      </div>
      <div className={"mt-4 flex flex-row items-center gap-x-2"}>
        <MdDateRange className={"inline-block h-5 w-5 opacity-50"} />
        <span className={"text-sm text-gray-500"}>{dateDisplay}</span>
      </div>
      {!props.isOverviewForManageTeam && (
        <>
          <div className={"mt-4 flex flex-row items-center gap-x-2"}>
            <BiTimeFive className={"inline-block h-5 w-5 opacity-50"} />
            <span className={"text-sm text-gray-500"}>{props.contest.time_begin}</span>
          </div>
          <div className={"mt-4 flex flex-row items-center gap-x-2"}>
            <GiDuration className={"inline-block h-5 w-5 opacity-50"} />
            <span className={"text-sm text-gray-500"}>{props.contest.duration}</span>
          </div>
        </>
      )}
      {props.isShowAction && (
        <div className={"mt-4 flex flex-row items-center gap-x-3"}>
          {status !== "Đã kết thúc" && status !== "Đang diễn ra" ? (
            <NavLink
              className={
                "w-32 rounded-lg bg-[#0077b6] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70"
              }
              to={`/manage-contest/${props.id}`}
            >
              Cập nhật
            </NavLink>
          ) : (
            <NavLink
              className={
                "w-32 rounded-lg bg-[#0077b6] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70"
              }
              to={`/manage-contest/${props.id}`}
            >
              Xem chi tiết
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
          {status !== "Chưa bắt đầu" && (
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
      {props.isOverviewForManageTeam && (
        <div className={"mt-4"}>
          <NavLink
            className={
              "inline-block w-32 rounded-lg bg-[#0077b6] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70"
            }
            to={`/manage-team/${props.id}`}
          >
            Xem chi tiết
          </NavLink>
        </div>
      )}
    </li>
  );
}

export { OverviewContest };
