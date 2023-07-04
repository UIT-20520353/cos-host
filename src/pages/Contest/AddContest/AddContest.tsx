import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IContest, listTimeContest } from "~/types";
import { insertContest } from "~/query";
import Swal from "sweetalert2";
import { isFutureDate, useSessionStorage } from "~/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { LoadingModal } from "~/components";

type IProps = {
  closeAddContestForm: () => void;
};

function AddContest(props: IProps) {
  const [user] = useSessionStorage("user", null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<IContest>();
  useEffect(() => {
    document.title = "Tạo cuộc thi";
    setValue("host_id", user.id);
  }, []);

  const { mutate: mutateAdd, isLoading } = useMutation({
    mutationFn: (body: IContest) => {
      return insertContest(body);
    },
    onSuccess: (response: boolean) => {
      if (response) {
        toast("Tạo đề thi mới thành công", {
          type: "success",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
        reset();
      } else {
        toast("Xảy ra lỗi khi tạo đề thi mới", {
          type: "error",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
      }
    }
  });

  const onSubmit: SubmitHandler<IContest> = (data) => {
    Swal.fire({
      title: "Xác nhận tạo cuộc thi mới?",
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
    <div className={"w-full"}>
      <form onSubmit={handleSubmit(onSubmit)} className={""}>
        <div className={"mt-8 rounded-md border border-gray-200 bg-gray-100 shadow-md"}>
          <div className={"p-3"}>
            <p className={"p-3 pb-0 text-3xl font-semibold"}>Tạo cuộc thi</p>
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
                  {...register("name", { required: "Tên cuộc thi không được bỏ trống" })}
                  autoComplete={"off"}
                />
                {errors.name && <span className={"text-xs text-red-600"}>{errors.name.message}</span>}
              </div>
              <div className="mb-4">
                <textarea
                  id={"contest_description"}
                  placeholder={"Mô tả ngắn gọn về cuộc thi"}
                  rows={5}
                  className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  {...register("description")}
                  autoComplete={"off"}
                />
              </div>
              <div className={"mb-3 grid grid-cols-3 gap-x-6"}>
                <div className={"inline-block flex-1"}>
                  <span className={"mb-2 block text-sm font-medium text-gray-900"}>Ngày bắt đầu</span>
                  <input
                    id={"contest_date_begin"}
                    type={"date"}
                    className={
                      "inline-block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    }
                    {...register("date_begin", {
                      required: "Ngày bắt đầu không được bỏ trống",
                      validate: (value) => isFutureDate(value) || "Ngày bắt đầu không được ở quá khứ  "
                    })}
                    autoComplete={"off"}
                  />
                  {errors.date_begin && <span className={"text-xs text-red-600"}>{errors.date_begin.message}</span>}
                </div>
                <div className={"inline-block flex-1"}>
                  <span className={"mb-2 block text-sm font-medium text-gray-900"}>Giớ bắt đầu</span>
                  <input
                    id={"contest_time_begin"}
                    type="time"
                    className={
                      "inline-block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    }
                    {...register("time_begin", { required: "Giờ bắt đầu không được bỏ trống" })}
                    autoComplete={"off"}
                  />
                  {errors.time_begin && <span className={"text-xs text-red-600"}>{errors.time_begin.message}</span>}
                </div>
                <div className={"inline-block flex-1"}>
                  <span className={"mb-2 block text-sm font-medium text-gray-900"}>Thời gian thi</span>
                  <select
                    id={"contest_duration"}
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
            </div>
            <div className={"mt-10 flex flex-row items-center gap-x-3"}>
              <button
                className={
                  "w-40 rounded-lg bg-[#023e8a] py-3 text-base font-semibold text-white duration-200 hover:opacity-80"
                }
                type={"submit"}
              >
                Lưu
              </button>
              <button
                className={
                  "w-40 rounded-lg bg-[#d00000] py-3 text-base font-semibold text-white duration-200 hover:opacity-70"
                }
                type={"button"}
                onClick={props.closeAddContestForm}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </form>
      {isLoading && <LoadingModal title={"Đang xử lý"} />}
    </div>
  );
}

export default AddContest;
