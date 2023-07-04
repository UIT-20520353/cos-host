import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IContest, IProblem } from "~/types";
import { getContestStatus } from "~/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProblem, updateProblem } from "~/query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

interface ProblemFormProps {
  problem: IProblem;
  contest: IContest;
}

function ProblemForm(props: ProblemFormProps) {
  const [statusContest, setStatusContest] = useState<string>("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IProblem>();

  useEffect(() => {
    setValue("id", props.problem.id);
    setValue("name", props.problem.name);
    setValue("detail", props.problem.detail);
    setValue("example_input", props.problem.example_input);
    setValue("example_output", props.problem.example_output);
    setValue("contest_id", props.problem.contest_id);
  }, [props.problem]);

  useEffect(() => {
    const { status } = getContestStatus(props.contest.date_begin, props.contest.time_begin, props.contest.duration);
    setStatusContest(status);
  }, [props.contest.date_begin, props.contest.time_begin, props.contest.duration, props.contest]);

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: (body: IProblem) => {
      return updateProblem(body);
    },
    onSuccess: (response: boolean) => {
      if (response) {
        toast("Cập nhật đề thi thành công", {
          type: "success",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
        queryClient.invalidateQueries({ queryKey: ["detail-problem", `problem-${props.problem.id}`] });
      } else {
        toast("Xảy ra lỗi khi cập nhật đề thi", {
          type: "error",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
      }
    }
  });

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
        navigate(`/manage-contest/contest-${props.contest.id}`);
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

  const onSubmit: SubmitHandler<IProblem> = (data) => {
    Swal.fire({
      title: "Cập nhật thông tin đề thi?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        mutateUpdate(data);
      }
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Xóa đề thi này?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        mutateDelete(props.problem.id);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"mx-5 mt-8 rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"}
    >
      <div className={"flex flex-row items-center justify-between"}>
        <p className={"text-2xl font-semibold"}>Thông tin đề thi</p>
        <NavLink
          to={`/manage-contest/contest-${props.contest.id}`}
          className={"rounded-md px-4 py-2 text-base font-semibold duration-300 hover:bg-gray-300"}
        >
          Quay lại
        </NavLink>
      </div>
      <div className={"my-4 flex flex-col items-start gap-y-2"}>
        <span className={"text-sm font-semibold"}>Tên bài thi</span>
        <input
          type={"text"}
          className={
            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          }
          placeholder={"Tên bài thi"}
          autoComplete={"off"}
          {...register("name", { required: "Tên bài thi không được bỏ trống" })}
          readOnly={!(statusContest === "Chưa bắt đầu")}
        />
        {errors.name && <span className={"text-xs text-red-600"}>{errors.name.message}</span>}
      </div>
      <div className={"mb-4 flex flex-col items-start gap-y-2"}>
        <span className={"text-sm font-semibold"}>Đề thi</span>
        <textarea
          placeholder={"Đề thi"}
          rows={10}
          className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          {...register("detail", { required: "Đề thi không được bỏ trống" })}
          autoComplete={"off"}
          readOnly={!(statusContest === "Chưa bắt đầu")}
        />
        {errors.detail && <span className={"text-xs text-red-600"}>{errors.detail.message}</span>}
      </div>
      <div className={"mb-4 flex flex-col items-start gap-y-2"}>
        <span className={"text-sm font-semibold"}>Input mẫu</span>
        <textarea
          placeholder={"Input mẫu"}
          rows={5}
          className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          {...register("example_input", { required: "Input mẫu không được bỏ trống" })}
          autoComplete={"off"}
          readOnly={!(statusContest === "Chưa bắt đầu")}
        />
        {errors.example_input && <span className={"text-xs text-red-600"}>{errors.example_input.message}</span>}
      </div>
      <div className={"mb-4 flex flex-col items-start gap-y-2"}>
        <span className={"text-sm font-semibold"}>Output mẫu</span>
        <textarea
          id={"example_output"}
          placeholder={"Output mẫu"}
          rows={5}
          className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          {...register("example_output", { required: "Output mẫu không được bỏ trống" })}
          autoComplete={"off"}
          readOnly={!(statusContest === "Chưa bắt đầu")}
        />
        {errors.example_output && <span className={"text-xs text-red-600"}>{errors.example_output.message}</span>}
      </div>
      {statusContest === "Chưa bắt đầu" && (
        <div className={"flex flex-row items-center gap-x-3"}>
          <button
            className={
              "w-40 rounded-lg bg-[#023e8a] py-3 text-base font-semibold text-white duration-200 hover:opacity-80"
            }
            type={"submit"}
          >
            Cập nhật
          </button>
          <button
            className={
              "w-40 rounded-lg bg-[#d00000] py-3 text-base font-semibold text-white duration-200 hover:opacity-70"
            }
            type={"button"}
            onClick={handleDelete}
          >
            Xóa đề thi
          </button>
        </div>
      )}
    </form>
  );
}

export { ProblemForm };
