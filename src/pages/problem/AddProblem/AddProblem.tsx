import { SubmitHandler, useForm } from "react-hook-form";
import { IProblem } from "../../../types/problem.type";
import { insertProblem } from "../../../query/api/problem-service";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { IContest } from "../../../types/contest.type";
import { getMyContests } from "../../../query/api/contest-service";

type IProps = {
  closeAddForm: () => void;
};

function AddProblem(props: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<IProblem>();

  const [contests, setContests] = useState<IContest[]>([]);
  useEffect(() => {
    getMyContests().then((response) => {
      setContests(response ?? []);
      setValue("contest_id", response[0].id);
    });
  }, []);

  const onSubmit: SubmitHandler<IProblem> = (data) => {
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
        insertProblem(data).then((index) => console.log(index));
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"mt-8 rounded-md bg-gray-100 p-3 shadow-md"}>
      <div className={"mb-4 flex flex-col items-start gap-y-2"}>
        <span className={"text-sm font-semibold"}>Chọn cuộc thi</span>
        <select
          className={
            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          }
          {...register("contest_id", { required: "Hãy chọn cuộc thi để thêm đề bài" })}
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
        <span className={"text-sm font-semibold"}>Tên bài thi</span>
        <input
          type={"text"}
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
        <span className={"text-sm font-semibold"}>Đề thi</span>
        <textarea
          placeholder={"Đề thi"}
          rows={10}
          className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          {...register("detail", { required: "Đề thi không được bỏ trống" })}
          autoComplete={"off"}
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
