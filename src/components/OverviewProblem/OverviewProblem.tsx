import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteProblem } from "../../query/api/problem-service";

type IProps = {
  id: number;
  name: string;
  contest_id: string;
  updateProblemList: () => void;
};

function OverviewProblem(props: IProps) {
  const handleDeleteProblem = () => {
    Swal.fire({
      title: "Xóa đề thi",
      text: "Xóa tất cả thông tin về đề thi này?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProblem(props.id).then((response) => {
          console.log(response);
          Swal.fire({
            position: "center",
            timer: 5000,
            icon: "success",
            showConfirmButton: true,
            title: "Xóa đề thi thành công"
          });
          props.updateProblemList();
        });
      }
    });
  };

  return (
    <li id={`problem-${props.id}`} className={"grid gap-3 rounded-md bg-gray-200 p-3 shadow-md"}>
      <p className={"text-base font-semibold"}>{props.name}</p>
      <div className={"flex flex-row items-center gap-x-1"}>
        <NavLink
          className={
            "rounded-lg bg-[#0077b6] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70"
          }
          to={`/manage-contest/contest-${props.contest_id}/problem-${props.id}`}
        >
          Xem chi tiết
        </NavLink>
        <button
          className={
            "rounded-lg bg-[#d00000] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70"
          }
          onClick={handleDeleteProblem}
        >
          Xóa cuộc thi
        </button>
      </div>
    </li>
  );
}

export default OverviewProblem;
