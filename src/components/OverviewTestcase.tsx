import { AiFillCaretDown } from "react-icons/all";
import { useEffect, useState } from "react";
import { ITestcase } from "~/types";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { deleteTestcaseById, updateTestcase } from "~/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type IProps = {
  name: number;
  testcase: ITestcase;
  statusContest: string;
  problemId: number;
};

function OverviewTestcase(props: IProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ITestcase>();

  useEffect(() => {
    setValue("id", props.testcase.id);
    setValue("input", props.testcase.input);
    setValue("output", props.testcase.output);
  }, []);

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: (body: ITestcase) => {
      return updateTestcase(body);
    },
    onSuccess: (response: boolean) => {
      if (response) {
        toast("Cập nhật testcase thành công", {
          type: "success",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
        queryClient.invalidateQueries({ queryKey: ["detail-problem", "testcase-list", `problem-${props.problemId}`] });
      } else {
        toast("Xảy ra lỗi khi cập nhật testcase", {
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
      return deleteTestcaseById(body);
    },
    onSuccess: (response: boolean) => {
      if (response) {
        toast("Xóa testcase thành công", {
          type: "success",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
        queryClient.invalidateQueries({ queryKey: ["detail-problem", "testcase-list", `problem-${props.problemId}`] });
      } else {
        toast("Xảy ra lỗi khi xóa testcase", {
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
      title: `Cập nhật thông tin testcase ${props.name + 1}`,
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
      title: `Xóa testcase ${props.name + 1}`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        mutateDelete(props.testcase.id);
      }
    });
  };

  return (
    <li id={`testcase-${props.testcase.id}`} className={"grid gap-3 rounded-md bg-gray-100 p-3 shadow-md"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"flex flex-row items-center justify-between"}>
          <p className={"text-lg font-semibold"}>Testcase {props.name + 1}</p>
          <AiFillCaretDown
            onClick={() => setIsOpen(!isOpen)}
            className={`h-8 w-8 ${isOpen && "rotate-180"} cursor-pointer text-gray-600 duration-300 hover:text-black`}
          />
        </div>
        <div className={`${!isOpen && "hidden"}`}>
          <div className={`mb-4 flex flex-col items-start gap-y-2`}>
            <span className={"text-sm font-semibold"}>Input</span>
            <textarea
              placeholder={"Input"}
              rows={10}
              className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              autoComplete={"off"}
              {...register("input", { required: "Input không được bỏ trống" })}
              readOnly={!(props.statusContest === "Chưa bắt đầu")}
            />
            {errors.input && <span className={"text-xs text-red-600"}>{errors.input.message}</span>}
          </div>
          <div className={"mb-2 flex flex-col items-start gap-y-2"}>
            <span className={"text-sm font-semibold"}>Output</span>
            <textarea
              placeholder={"Output"}
              rows={10}
              className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              autoComplete={"off"}
              {...register("output", { required: "Output không được bỏ trống" })}
              readOnly={!(props.statusContest === "Chưa bắt đầu")}
            />
            {errors.output && <span className={"text-xs text-red-600"}>{errors.output.message}</span>}
          </div>
          {props.statusContest === "Chưa bắt đầu" && (
            <div className={`flex flex-row items-center gap-x-3 duration-300`}>
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
                Xóa testcase
              </button>
            </div>
          )}
        </div>
      </form>
    </li>
  );
}

export { OverviewTestcase };
