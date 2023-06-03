import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { useEffect } from "react";
import { listTimeContest } from "../../../types/time.type";
import { getContestById, updateContestById } from "../../../query/api/contest-service";
import { IContest } from "../../../types/contest.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { isFutureDate } from "../../../utils/ValidateDate/ValidateDate";
import Swal from "sweetalert2";

function DetailContest() {
  useEffect(() => {
    document.title = "Cập nhật thông tin cuộc thi";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IContest>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    let temp: string[] = [];
    if (id) {
      temp = id.toString().split("-");
    }
    const contestId = parseInt(temp[1]);
    getContestById(contestId).then((data) => {
      if (data) {
        setValue("id", contestId);
        setValueForm({
          name: data[0].name,
          description: data[0].description,
          date_begin: data[0].date_begin,
          time_begin: data[0].time_begin,
          duration: data[0].duration
        });
      }
    });
  }, []);

  const onSubmit: SubmitHandler<IContest> = (data) => {
    Swal.fire({
      title: "Cập nhật thông tin cuộc thi",
      text: `Xác nhận sẽ cập nhật các thông tin của cuộc thi?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        updateContestById(data).then((response) => {
          Swal.fire({
            position: "center",
            timer: 5000,
            icon: "success",
            showConfirmButton: true,
            title: "Cập nhật cuộc thi thành công"
          });
          setValueForm({
            name: response[0].name,
            description: response[0].description,
            date_begin: response[0].date_begin,
            time_begin: response[0].time_begin,
            duration: response[0].duration
          });
        });
      }
    });
  };

  const setValueForm = ({
    name,
    description,
    date_begin,
    time_begin,
    duration
  }: {
    name: string;
    description: string;
    date_begin: string;
    time_begin: string;
    duration: string;
  }) => {
    setValue("name", name);
    setValue("description", description);
    setValue("date_begin", date_begin);
    setValue("time_begin", time_begin);
    setValue("duration", duration);
  };

  return (
    <div className={"w-full"}>
      <Header />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"mx-5 my-8 rounded-md border border-gray-200 bg-gray-100 shadow-md"}
      >
        <div className={"p-3"}>
          <p className={"p-3 pb-0 text-3xl font-semibold"}>Cập nhật thông tin cuộc thi</p>
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
            <div className={"mt-5 flex flex-row items-center gap-x-3"}>
              <button
                className={
                  "w-40 rounded-lg bg-[#023e8a] py-3 text-base font-semibold text-white duration-200 hover:opacity-80"
                }
                type={"submit"}
              >
                Cập nhật
              </button>
              {/*<button*/}
              {/*  className={*/}
              {/*    "w-40 rounded-lg bg-[#d00000] py-3 text-base font-semibold text-white duration-200 hover:opacity-70"*/}
              {/*  }*/}
              {/*  type={"button"}*/}
              {/*>*/}
              {/*  Hủy*/}
              {/*</button>*/}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DetailContest;
