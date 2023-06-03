import { NavLink, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProblem } from "../../../types/problem.type";
import { useEffect } from "react";
import { getProblemById, updateProblem } from "../../../query/api/problem-service";
import Swal from "sweetalert2";

function DetailProblem() {
  const { contestId, problemId } = useParams<{ problemId: string; contestId: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IProblem>();

  useEffect(() => {
    let temp: string[] = [];
    if (problemId) {
      temp = problemId.toString().split("-");
    }
    const problem_id = parseInt(temp[1]);
    getProblemById(problem_id).then((data) => {
      if (data) {
        setValue("id", problem_id);
        setValueForm({
          name: data[0].name,
          detail: data[0].detail,
          example_input: data[0].example_input,
          example_output: data[0].example_output,
          contest_id: data[0].contest_id
        });
      }
    });
  }, []);

  const onSubmit: SubmitHandler<IProblem> = (data) => {
    Swal.fire({
      title: "Cập nhật thông tin đề thi",
      text: `Xác nhận sẽ cập nhật các thông tin của đề thi?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        updateProblem(data).then((response) => {
          if (response?.length !== 0 && response) {
            Swal.fire({
              position: "center",
              timer: 5000,
              icon: "success",
              showConfirmButton: true,
              title: "Cập nhật đề thi thành công"
            });
            setValueForm({
              name: data.name,
              detail: data.detail,
              example_input: data.example_input,
              example_output: data.example_output,
              contest_id: data.contest_id
            });
          }
        });
      }
    });
  };

  const setValueForm = ({
    name,
    detail,
    example_input,
    example_output,
    contest_id
  }: {
    name: string;
    detail: string;
    example_input: string;
    example_output: string;
    contest_id: number;
  }) => {
    setValue("name", name);
    setValue("detail", detail);
    setValue("example_input", example_input);
    setValue("example_output", example_output);
    setValue("contest_id", contest_id);
  };

  return (
    <div className={"w-full"}>
      <Header />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"mx-5 my-8 rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"}
      >
        <div className={"flex flex-row items-center justify-between"}>
          <p className={"text-2xl font-semibold"}>Thông tin đề thi</p>
          <NavLink
            to={`/manage-contest/${contestId}`}
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
        <div>
          <button
            className={
              "w-40 rounded-lg bg-[#023e8a] py-3 text-base font-semibold text-white duration-200 hover:opacity-80"
            }
            type={"submit"}
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}

export default DetailProblem;
