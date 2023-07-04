import { SubmitHandler, useForm } from "react-hook-form";
import { ITestcase } from "~/types";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { ModalPortal } from "~/components";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { insertTestcase } from "~/query";

type ModalProps = {
  problemId: number;
  closeModal: () => void;
};

function AddTestcaseModal(props: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ITestcase>();

  useEffect(() => {
    setValue("problem_id", props.problemId);
  }, []);

  const { mutate: mutateAdd } = useMutation({
    mutationFn: (body: ITestcase) => {
      return insertTestcase(body);
    },
    onSuccess: (response: boolean) => {
      if (response) {
        toast("Xóa cuộc thi thành công", {
          type: "success",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
        props.closeModal();
      } else {
        toast("Xảy ra lỗi khi xóa cuộc thi", {
          type: "error",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
      }
    }
  });

  const onSubmit: SubmitHandler<ITestcase> = (data) => {
    Swal.fire({
      title: "Tạo testcase mới ?",
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
    <ModalPortal>
      <div className={"fixed left-0 top-0 z-[100] h-screen w-full bg-black opacity-50"}></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          "fixed left-1/2 top-1/2 z-[200] max-h-[95%] w-3/5 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-white p-5"
        }
      >
        <p className={"mb-5 text-lg font-semibold"}>Thêm testcase mới</p>
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

export { AddTestcaseModal };
