import { SubmitHandler, useForm } from "react-hook-form";
import { IProblem } from "../../../types/problem.type";
import { IContest } from "../../../types/contest.type";
import { useEffect, useState } from "react";
import { getMyContests } from "../../../query/api/contest-service";

type IProps = {
  closeAddForm: () => void;
};

function AddProblem(props: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IProblem>();
  const [contests, setContests] = useState<IContest[]>([]);

  useEffect(() => {
    getMyContests().then((data) => setContests(data));
  }, []);

  const onSubmit: SubmitHandler<IProblem> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"mt-8 rounded-md bg-gray-100 p-3 shadow-md"}>
      <div className={"mb-4 flex flex-col items-start gap-y-2"}>
        <label htmlFor={"contest_id"} className={"text-sm font-semibold"}>
          Chọn cuộc thi
        </label>
        <select
          id={"contest_id"}
          className={
            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          }
          {...register("contest_id")}
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
        <label htmlFor={"name_problem"} className={"text-sm font-semibold"}>
          Tên bài thi
        </label>
        <input
          type={"text"}
          id={"name_problem"}
          className={
            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          }
          placeholder={"Tên bài thi"}
          autoComplete={"off"}
          {...register("name", { required: "Tên bài thi không được bỏ trống" })}
        />
        {errors.name && <span className={"text-xs text-red-600"}>{errors.name.message}</span>}
      </div>
      <div className={"mb-4 flex flex-col items-start gap-y-2"}>
        <label htmlFor={"detail"} className={"text-sm font-semibold"}>
          Đề thi
        </label>
        <textarea
          id={"detail"}
          placeholder={"Đề thi"}
          rows={10}
          className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          {...register("detail", { required: "Đề thi không được bỏ trống" })}
          autoComplete={"off"}
        />
        {errors.detail && <span className={"text-xs text-red-600"}>{errors.detail.message}</span>}
      </div>
      <div className={"mb-4 flex flex-col items-start gap-y-2"}>
        <label htmlFor={"example_input"} className={"text-sm font-semibold"}>
          Input mẫu
        </label>
        <textarea
          placeholder={"Input mẫu"}
          rows={5}
          id={"example_input"}
          className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          {...register("example_input", { required: "Input mẫu không được bỏ trống" })}
          autoComplete={"off"}
        />
        {errors.example_input && <span className={"text-xs text-red-600"}>{errors.example_input.message}</span>}
      </div>
      <div className={"mb-4 flex flex-col items-start gap-y-2"}>
        <label htmlFor={"example_output"} className={"text-sm font-semibold"}>
          Output mẫu
        </label>
        <textarea
          id={"example_output"}
          placeholder={"Output mẫu"}
          rows={5}
          className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          {...register("example_output", { required: "Output mẫu không được bỏ trống" })}
          autoComplete={"off"}
        />
        {errors.example_output && <span className={"text-xs text-red-600"}>{errors.example_output.message}</span>}
      </div>
      <div className={"flex flex-row items-center gap-x-3"}>
        <button
          type={"submit"}
          className={
            "w-36 rounded-md bg-[#023e8a] px-4 py-2 text-base font-medium text-white duration-200 hover:opacity-80"
          }
        >
          Lưu đề thi
        </button>
        <button
          type={"button"}
          className={
            "w-36 rounded-md bg-[#d00000] px-4 py-2 text-base font-medium text-white duration-200 hover:opacity-70"
          }
          onClick={props.closeAddForm}
        >
          Hủy
        </button>
      </div>
    </form>
  );
}

export default AddProblem;
