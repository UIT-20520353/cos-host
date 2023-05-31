import { useEffect } from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import { IContest } from "../../../types/contest.type";
import { insertContest } from "../../../query/api/contest-service";
import Swal from "sweetalert2";

type ITimeContest = {
  value: string;
  text: string;
};

const listTimeContest: ITimeContest[] = [
  {
    value: "30 phút",
    text: "30 phút"
  },
  {
    value: "1 giờ",
    text: "1 giờ"
  },
  {
    value: "1 giờ 30 phút",
    text: "1 giờ 30 phút"
  },
  {
    value: "2 giờ",
    text: "2 giờ"
  },
  {
    value: "2 giờ 30 phút",
    text: "2 giờ 30 phút"
  },
  {
    value: "3 giờ",
    text: "3 giờ"
  },
  {
    value: "3 giờ 30 phút",
    text: "3 giờ 30 phút"
  },
  {
    value: "4 giờ",
    text: "4 giờ"
  },
  {
    value: "4 giờ 30 phút",
    text: "4 giờ 30 phút"
  },
  {
    value: "5 giờ",
    text: "5 giờ"
  },
  {
    value: "5 giờ 30 phút",
    text: "5 giờ 30 phút"
  }
];

type IProps = {
  closeAddContestForm: () => void;
};

function AddContest(props: IProps) {
  useEffect(() => {
    document.title = "Tạo cuộc thi";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IContest>();

  const onSubmit: SubmitHandler<IContest> = (data) => {
    Swal.fire({
      title: "Tạo cuộc thi",
      text: "Tạo cuộc thi mới với các thông tin đã nhập?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        data.host_id = sessionStorage.getItem("id");
        insertContest(data).then((value) => console.log(value));
        Swal.fire({
          position: "center",
          timer: 5000,
          icon: "success",
          showConfirmButton: true,
          title: "Tạo cuộc thi thành công"
        });
        reset();
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
                  placeholder={"Mô tả ngắn gọn về cuộc thi"}
                  rows={5}
                  className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  {...register("description")}
                  autoComplete={"off"}
                />
              </div>
              <div className={"mb-3 grid grid-cols-3 gap-x-6"}>
                <div className={"inline-block flex-1"}>
                  <label className={"mb-2 block text-sm font-medium text-gray-900"} htmlFor={"date_begin"}>
                    Ngày bắt đầu
                  </label>
                  <input
                    id={"date_begin"}
                    type={"date"}
                    className={
                      "inline-block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    }
                    {...register("date_begin", { required: "Ngày bắt đầu không được bỏ trống" })}
                  />
                  {errors.date_begin && <span className={"text-xs text-red-600"}>{errors.date_begin.message}</span>}
                </div>
                <div className={"inline-block flex-1"}>
                  <label className={"mb-2 block text-sm font-medium text-gray-900"} htmlFor={"time_begin"}>
                    Giớ bắt đầu
                  </label>
                  <input
                    id={"time_begin"}
                    type="time"
                    className={
                      "inline-block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    }
                    {...register("time_begin", { required: "Giờ bắt đầu không được bỏ trống" })}
                  />
                  {errors.time_begin && <span className={"text-xs text-red-600"}>{errors.time_begin.message}</span>}
                </div>
                <div className={"inline-block flex-1"}>
                  <label htmlFor={"duration"} className={"mb-2 block text-sm font-medium text-gray-900"}>
                    Thời gian thi
                  </label>
                  <select
                    id={"duration"}
                    className={
                      "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    }
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
    </div>
  );
}

export default AddContest;
