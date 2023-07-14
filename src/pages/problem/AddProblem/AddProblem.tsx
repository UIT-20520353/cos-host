import { SubmitHandler, useForm } from "react-hook-form";
import { IProblem } from "~/types";
import { insertProblem, getContestsNotStarted } from "~/query";
import Swal from "sweetalert2";
import { useSessionStorage } from "~/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoadingModal } from "~/components";
import { toast } from "react-toastify";

type IProps = {
  closeAddForm: () => void;
};

function AddProblem(props: IProps) {
  const [user] = useSessionStorage("cos-host", null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IProblem>();

  const { data: contests, isLoading: isFetchingContests } = useQuery({
    queryKey: ["add-problem", "contest-list", `host-${user.id}`],
    queryFn: () => {
      return getContestsNotStarted(user.id);
    }
  });

  const { mutate: mutateAdd } = useMutation({
    mutationFn: (body: IProblem) => {
      return insertProblem(body);
    },
    onSuccess: (response: boolean) => {
      if (response) {
        toast("Thêm đề thi thành công", {
          type: "success",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
        reset();
      } else {
        toast("Xảy ra lỗi khi thêm đề thi", {
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
      title: "Xác nhận tạo đề thi mới?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        mutateAdd(data);
      }
    });
  };

  return (
    <div>
      {isFetchingContests && <LoadingModal title={"Đang lấy dữ liệu"} />}
      {!isFetchingContests && (
        <form onSubmit={handleSubmit(onSubmit)} className={"mt-8 rounded-md bg-gray-100 p-3 shadow-md"}>
          <div className={"mb-4 flex flex-col items-start gap-y-2"}>
            <span className={"text-sm font-semibold"}>Chọn cuộc thi</span>
            <select
              className={
                "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              }
              {...register("contest_id", { required: "Hãy chọn cuộc thi để thêm đề bài" })}
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
      )}
    </div>
  );
}

export default AddProblem;
