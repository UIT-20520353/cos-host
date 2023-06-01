import { SubmitHandler, useForm } from "react-hook-form";
import { ITestcase } from "../../types/testcase.type";
import { ChangeEvent, useEffect, useState } from "react";
import { IContest } from "../../types/contest.type";
import { getMyContests } from "../../query/api/contest-service";
import { IProblem } from "../../types/problem.type";
import { getProblems } from "../../query/api/problem-service";
import Swal from "sweetalert2";

type IProps = {
  closeAddTestcaseForm: () => void;
};

function AddTestcase(props: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ITestcase>();
  const [contests, setContests] = useState<IContest[]>([]);
  const [problems, setProblems] = useState<IProblem[]>([]);
  const [contestId, setContestId] = useState<string>("");

  useEffect(() => {
    getMyContests().then((data) => {
      setContests(data ?? []);
      if (data) {
        setContestId(data[0].id ?? "");
      }
    });
  }, []);

  const onSubmit: SubmitHandler<ITestcase> = (data) => {
    Swal.fire({
      title: "Tạo đề thi",
      text: "Tạo đề thi mới với các thông tin đã nhập?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(data);
        Swal.fire({
          position: "center",
          timer: 5000,
          icon: "success",
          showConfirmButton: true,
          title: "Tạo đề thi thành công"
        });
        reset();
      }
    });
  };

  const handleChangeContest = (event: ChangeEvent<HTMLSelectElement>) => {
    setContestId(event.target.value);
  };
  useEffect(() => {
    if (contestId)
      getProblems(contestId).then((data) => {
        setProblems(data ?? []);
      });
  }, [contestId]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"mt-8 rounded-md bg-gray-100 p-3 shadow-md"}>
      <div className={"mb-4 flex flex-col items-start gap-y-2"}>
        <span className={"text-sm font-semibold"}>Chọn cuộc thi</span>
        <select
          className={
            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          }
          {...register("contest_id")}
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
      </div>
      <div className={"mb-4 flex flex-col items-start gap-y-2"}>
        <span className={"text-sm font-semibold"}>Chọn đề thi</span>
        <select
          className={
            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          }
          {...register("problem_id")}
          onChange={handleChangeContest}
        >
          {problems.map((problem) => {
            return (
              <option key={problem.id} value={problem.id}>
                {problem.name}
              </option>
            );
          })}
        </select>
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
