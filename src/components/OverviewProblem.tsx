import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteProblem } from "~/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type IProps = {
  id: number;
  name: string;
  contest_id: number;
  status: string;
};

function OverviewProblem(props: IProps) {
  const queryClient = useQueryClient();
  const { mutate: mutateDelete } = useMutation({
    mutationFn: (body: number) => {
      return deleteProblem(body);
    },
    onSuccess: (response: boolean) => {
      if (response) {
        toast("Xóa đề thi thành công", {
          type: "success",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
        queryClient.invalidateQueries({ queryKey: ["detail-contest", "problem-list", `contest-${props.contest_id}`] });
      } else {
        toast("Xảy ra lỗi khi xóa đề thi", {
          type: "error",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
      }
    }
  });

  const handleDeleteProblem = () => {
    Swal.fire({
      title: `Xóa đề thi ${props.name}?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        mutateDelete(props.id);
      }
    });
  };

  return (
    <li id={`problem-${props.id}`} className={"grid gap-3 rounded-md bg-gray-200 p-3 shadow-md"}>
      <p className={"text-base font-semibold"}>{props.name}</p>
      <div className={"flex flex-row items-center gap-x-1"}>
        <NavLink
          className={
            "w-32 rounded-lg bg-[#0077b6] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70"
          }
          to={`/manage-contest/contest-${props.contest_id}/problem-${props.id}`}
        >
          Xem chi tiết
        </NavLink>
        {props.status !== "Đang diễn ra" && props.status !== "Đã kết thúc" && (
          <button
            className={
              "w-32 rounded-lg bg-[#d00000] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70"
            }
            onClick={handleDeleteProblem}
          >
            Xóa đề thi
          </button>
        )}
      </div>
    </li>
  );
}

export { OverviewProblem };
