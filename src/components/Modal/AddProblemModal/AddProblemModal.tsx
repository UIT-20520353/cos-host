import ModalPortal from "../../ModalPortal";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProblem } from "../../../types/problem.type";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { insertProblem } from "../../../query/api/problem-service";

type ModalProps = {
  contestId: number;
  closeModal: () => void;
};

function AddProblemModal(props: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IProblem>();

  useEffect(() => {
    setValue("contest_id", props.contestId);
  }, []);

  const onSubmit: SubmitHandler<IProblem> = (data) => {
    Swal.fire({
      title: "Tạo đề thi",
      text: "Xác nhận tạo đề thi mới với các thông tin đã nhập?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        insertProblem(data).then((index) => {
          if (index) {
            Swal.fire({
              position: "center",
              timer: 5000,
              icon: "success",
              showConfirmButton: true,
              title: "Tạo đề thi thành công"
            });
            props.closeModal();
          }
        });
      }
    });
  };

  return (
    <ModalPortal>
      <div className={"fixed left-0 top-0 h-screen w-full bg-black opacity-50"}></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          "fixed left-1/2 top-1/2 max-h-[95%] w-3/5 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-white p-5"
        }
      >
        <p className={"mb-5 text-lg font-semibold"}>Tạo cuộc thi mới</p>
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
            autoComplete={"off"}
            {...register("detail", { required: "Đề thi không được bỏ trống" })}
          />
          {errors.detail && <span className={"text-xs text-red-600"}>{errors.detail.message}</span>}
        </div>
        <div className={"mb-4 flex flex-col items-start gap-y-2"}>
          <span className={"text-sm font-semibold"}>Input mẫu</span>
          <textarea
            placeholder={"Input mẫu"}
            rows={5}
            className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            autoComplete={"off"}
            {...register("example_input", { required: "Input mẫu không được bỏ trống" })}
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
            autoComplete={"off"}
            {...register("example_output", { required: "Output mẫu không được bỏ trống" })}
          />
          {errors.example_output && <span className={"text-xs text-red-600"}>{errors.example_output.message}</span>}
        </div>
        <div className={"flex flex-row items-center gap-x-3"}>
          <button
            className={
              "w-32 rounded-lg bg-[#0077b6] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70"
            }
            type={"submit"}
          >
            Lưu
          </button>
          <button
            className={
              "w-32 rounded-lg bg-[#d00000] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70"
            }
            type={"button"}
            onClick={props.closeModal}
          >
            Đóng
          </button>
        </div>
      </form>
    </ModalPortal>
  );
}

export default AddProblemModal;
