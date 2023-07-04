import { NavLink, useNavigate } from "react-router-dom";
import { getContestStatus, isFutureDate } from "~/utils";
import { IContest, listTimeContest } from "~/types";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { deleteContest, updateContestById } from "~/query";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface ContestFormProps {
  contest: IContest;
}

function ContestForm(props: ContestFormProps) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("");
  const queryClient = useQueryClient();
  const { mutate: mutateUpdate } = useMutation({
    mutationFn: (body: IContest) => {
      return updateContestById(body);
    },
    onSuccess: (response: boolean) => {
      if (response) {
        toast("Cập nhật thông tin cuộc thi thành công", {
          type: "success",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
        queryClient.invalidateQueries({ queryKey: ["detail-contest", `contest-${props.contest.id}`] });
      } else {
        toast("Xảy ra lỗi khi xóa cập nhật", {
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
      return deleteContest(body);
    },
    onSuccess: (response: boolean) => {
      if (response) {
        toast("Xóa cuộc thi thành công", {
          type: "success",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
        navigate("/manage-contest", { replace: true });
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IContest>();

  useEffect(() => {
    setValue("id", props.contest.id);
    setValue("name", props.contest.name);
    setValue("date_begin", props.contest.date_begin);
    setValue("time_begin", props.contest.time_begin);
    setValue("description", props.contest.description);
    setValue("duration", props.contest.duration);
    const { status } = getContestStatus(props.contest.date_begin, props.contest.time_begin, props.contest.duration);
    setStatus(status);
  }, [props.contest.date_begin, props.contest.time_begin, props.contest.duration, props.contest]);

  const deleteContestInUI = () => {
    Swal.fire({
      title: "Xóa cuộc thi này?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        mutateDelete(props.contest.id);
      }
    });
  };

  const onSubmit: SubmitHandler<IContest> = (data) => {
    Swal.fire({
      title: "Xác nhận cập nhật thông tin cuộc thi?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        mutateUpdate(data);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"mx-5 my-8 rounded-md border border-gray-200 bg-gray-100 shadow-md"}
    >
      <div className={"p-3"}>
        <div className={"flex flex-row items-center justify-between"}>
          <p className={"p-3 pb-0 text-3xl font-semibold"}>Cập nhật thông tin cuộc thi</p>
          <NavLink
            to={"/manage-contest"}
            className={"rounded-md px-4 py-2 text-base font-semibold duration-300 hover:bg-gray-300"}
          >
            Quay lại
          </NavLink>
        </div>
        <div className={"p-4 pb-0"}>
          <p className={"mb-3 text-lg font-medium"}>Thông tin cuộc thi</p>
          <div className="mb-3">
            <input
              type={"text"}
              id={"name_contest"}
              className={
                "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              }
              placeholder={"Tên cuộc thi"}
              readOnly={!(status === "Chưa bắt đầu")}
              {...register("name", { required: "Tên cuộc thi không được bỏ trống" })}
              autoComplete={"off"}
            />
            {errors.name && <span className={"text-xs text-red-600"}>{errors.name.message}</span>}
          </div>
          <div className="mb-4">
            <textarea
              placeholder={"Mô tả ngắn gọn về cuộc thi"}
              rows={5}
              className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              {...register("description")}
              autoComplete={"off"}
              readOnly={!(status === "Chưa bắt đầu")}
            />
          </div>
          <div className={"mb-3 grid grid-cols-3 gap-x-6"}>
            <div className={"inline-block flex-1"}>
              <span className={"mb-2 block text-sm font-medium text-gray-900"}>Ngày bắt đầu</span>
              <input
                id={"date_begin"}
                type={"date"}
                className={
                  "inline-block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                }
                {...register("date_begin", {
                  required: "Ngày bắt đầu không được bỏ trống",
                  validate: (value) => isFutureDate(value) || "Ngày bắt đầu không được ở quá khứ"
                })}
                autoComplete={"off"}
                readOnly={!(status === "Chưa bắt đầu")}
              />
              {errors.date_begin && <span className={"text-xs text-red-600"}>{errors.date_begin.message}</span>}
            </div>
            <div className={"inline-block flex-1"}>
              <span className={"mb-2 block text-sm font-medium text-gray-900"}>Giớ bắt đầu</span>
              <input
                id={"time_begin"}
                type="time"
                className={
                  "inline-block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                }
                {...register("time_begin", { required: "Giờ bắt đầu không được bỏ trống" })}
                autoComplete={"off"}
                readOnly={!(status === "Chưa bắt đầu")}
              />
              {errors.time_begin && <span className={"text-xs text-red-600"}>{errors.time_begin.message}</span>}
            </div>
            <div className={"inline-block flex-1"}>
              <span className={"mb-2 block text-sm font-medium text-gray-900"}>Thời gian thi</span>
              <select
                id={"duration"}
                className={
                  "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                }
                autoComplete={"off"}
                {...register("duration", { required: true })}
              >
                {listTimeContest.map((item) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {status !== "Đang diễn ra" && status !== "Đã kết thúc" && (
            <div className={"mt-5 flex flex-row items-center gap-x-3"}>
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
                onClick={deleteContestInUI}
              >
                Xóa cuộc thi
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export { ContestForm };
