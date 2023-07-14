import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent } from "react";
import { ITestcase } from "~/types";
import { insertTestcase, getContestsNotStarted, getAllProblems } from "~/query";
import Swal from "sweetalert2";
import { useSessionStorage } from "~/utils";
import { useQuery } from "@tanstack/react-query";
import { LoadingModal } from "~/components";

type IProps = {
  closeAddTestcaseForm: () => void;
};

function AddTestcase(props: IProps) {
  const [user] = useSessionStorage("cos-host", null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ITestcase>();

  const { data: contests, isLoading: isFetchingContests } = useQuery({
    queryKey: ["add-problem", "contest-list", `host-${user.id}`],
    queryFn: () => {
      return getContestsNotStarted(user.id);
    }
  });
  const { data: problems, isLoading: isFetchingProblems } = useQuery({
    queryKey: ["add-problem", "problem-list"],
    queryFn: getAllProblems
  });

  const onSubmit: SubmitHandler<ITestcase> = (data) => {
    Swal.fire({
      title: "Xác nhận tạo testcase mới?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        insertTestcase(data).then((response) => {
          if (response) {
            Swal.fire({
              position: "center",
              timer: 5000,
              icon: "success",
              showConfirmButton: true,
              title: "Tạo testcase thành công",
              allowOutsideClick: false
            });
            setValue("input", "");
            setValue("output", "");
          } else {
            Swal.fire({
              position: "center",
              timer: 5000,
              icon: "error",
              showConfirmButton: true,
              title: "Xảy ra lỗi khi thêm testcase",
              allowOutsideClick: false
            });
          }
        });
      }
    });
  };

  const handleChangeContest = (event: ChangeEvent<HTMLSelectElement>) => {
    // getProblems(parseInt(event.target.value)).then((data) => {
    //   if (data) {
    //     setProblems(data ?? []);
    //     setValue("problem_id", data[0].id);
    //   }
    // });
    console.log(event.target.value);
  };

  return (
    <div>
      {(isFetchingContests || isFetchingProblems) && <LoadingModal title={"Đang lấy dữ liệu"} />}
      {!isFetchingContests && !isFetchingProblems && (
        <form onSubmit={handleSubmit(onSubmit)} className={"mt-8 rounded-md bg-gray-100 p-3 shadow-md"}>
          <div className={"mb-4 flex flex-col items-start gap-y-2"}>
            <span className={"text-sm font-semibold"}>Chọn cuộc thi</span>
            <select
              className={
                "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              }
              {...register("contest_id", { required: "Hãy chọn cuộc thi để thêm đề bài" })}
              onChange={handleChangeContest}
            >
              {contests?.map((contest) => {
                return (
                  <option key={contest.id} value={contest.id}>
                    {contest.name}
                  </option>
                );
              })}
            </select>
            {errors.contest_id && <span className={"text-xs text-red-600"}>{errors.contest_id.message}</span>}
          </div>
          <div className={"mb-4 flex flex-col items-start gap-y-2"}>
            <span className={"text-sm font-semibold"}>Chọn đề thi</span>
            <select
              className={
                "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              }
              {...register("problem_id", { required: "Hãy chọn đề thi để thêm testcase" })}
            >
              {problems?.map((problem) => {
                return (
                  <option key={problem.id} value={problem.id}>
                    {problem.name}
                  </option>
                );
              })}
            </select>
            {errors.problem_id && <span className={"text-xs text-red-600"}>{errors.problem_id.message}</span>}
          </div>
          <div className={"mb-4 flex flex-col items-start gap-y-2"}>
            <span className={"text-sm font-semibold"}>Input</span>
            <textarea
              placeholder={"Input"}
              rows={10}
              className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              {...register("input", { required: "Input không được bỏ trống" })}
              autoComplete={"off"}
            />
            {errors.input && <span className={"text-xs text-red-600"}>{errors.input.message}</span>}
          </div>
          <div className={"mb-4 flex flex-col items-start gap-y-2"}>
            <span className={"text-sm font-semibold"}>Output</span>
            <textarea
              placeholder={"Output"}
              rows={10}
              className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              {...register("output", { required: "Output không được bỏ trống" })}
              autoComplete={"off"}
            />
            {errors.output && <span className={"text-xs text-red-600"}>{errors.output.message}</span>}
          </div>
          <div className={"flex flex-row items-center gap-x-3"}>
            <button
              type={"submit"}
              className={
                "w-36 rounded-md bg-[#023e8a] px-4 py-2 text-base font-medium text-white duration-200 hover:opacity-80"
              }
            >
              Lưu testcase
            </button>
            <button
              type={"button"}
              className={
                "w-36 rounded-md bg-[#d00000] px-4 py-2 text-base font-medium text-white duration-200 hover:opacity-70"
              }
              onClick={props.closeAddTestcaseForm}
            >
              Hủy
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export { AddTestcase };
