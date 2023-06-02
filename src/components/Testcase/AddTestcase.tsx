import { SubmitHandler, useForm } from "react-hook-form";
import { ITestcase } from "../../types/testcase.type";
import { ChangeEvent, useEffect, useState } from "react";
import { IContest } from "../../types/contest.type";
import { getMyContests } from "../../query/api/contest-service";
import { IProblem } from "../../types/problem.type";
import { getProblems } from "../../query/api/problem-service";
import Swal from "sweetalert2";
import { insertTestcase } from "../../query/api/textcase-service";

type IProps = {
  closeAddTestcaseForm: () => void;
};

function AddTestcase(props: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ITestcase>();
  const [contests, setContests] = useState<IContest[]>([]);
  const [problems, setProblems] = useState<IProblem[]>([]);

  useEffect(() => {
    getMyContests().then((data) => {
      setContests(data ?? []);
      if (data?.length !== 0 && data) {
        // console.log(data);
        setValue("contest_id", data[0].id);
        getProblems(data[0].id).then((problems) => {
          if (problems?.length !== 0 && problems) {
            setProblems(problems ?? []);
            setValue("problem_id", problems[0].id);
          }
        });
      }
    });
  }, []);

  const onSubmit: SubmitHandler<ITestcase> = (data) => {
    Swal.fire({
      title: "Tạo testcase",
      text: "Tạo testcase mới với các thông tin đã nhập?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        insertTestcase(data).then((response) => {
          console.log("UI ", response);
          if (response) {
            Swal.fire({
              position: "center",
              timer: 5000,
              icon: "success",
              showConfirmButton: true,
              title: "Tạo testcase thành công",
              allowOutsideClick: false
            });
            reset();
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
    getProblems(parseInt(event.target.value)).then((data) => {
      setProblems(data ?? []);
    });
  };

  return (
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
          {contests.map((contest) => {
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
          {problems.map((problem) => {
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
  );
}

export default AddTestcase;
