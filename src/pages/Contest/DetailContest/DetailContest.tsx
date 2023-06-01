import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { listTimeContest } from "../../../types/time.type";
import { getContestById } from "../../../query/api/contest-service";
import { IContest } from "../../../types/contest.type";

const initialContest: IContest = {
  id: "",
  name: "",
  description: "",
  date_begin: "",
  time_begin: "",
  duration: "",
  host_id: ""
};

function DetailContest() {
  useEffect(() => {
    document.title = "Cập nhật thông tin cuộc thi";
  }, []);

  const { id } = useParams();
  const [contest, setContest] = useState<IContest>(initialContest);

  useEffect(() => {
    const temp = id?.toString().split("-");
    const contestId = parseInt(temp[1]) ?? 0;
    getContestById(contestId).then((data) => {
      console.log(data);
      setContest(data[0] ?? initialContest);
    });
  }, []);

  return (
    <div className={"w-full"}>
      <Header />

      <form>
        <div className={"mx-5 my-8 rounded-md border border-gray-200 bg-gray-100 shadow-md"}>
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
                  required={true}
                  defaultValue={contest.name}
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder={"Mô tả ngắn gọn về cuộc thi"}
                  rows={5}
                  className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  defaultValue={contest.description}
                />
              </div>
              <div className={"mb-3 flex flex-row items-center justify-between gap-x-6"}>
                <div className={"inline-block flex-1"}>
                  <span className={"mb-2 block text-sm font-medium text-gray-900"}>Ngày bắt đầu</span>
                  <input
                    id={"date_begin"}
                    type={"date"}
                    className={
                      "inline-block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    }
                    defaultValue={contest.date_begin}
                  />
                </div>
                <div className={"inline-block flex-1"}>
                  <span className={"mb-2 block text-sm font-medium text-gray-900"}>Giớ bắt đầu</span>
                  <input
                    id={"time_begin"}
                    type="time"
                    className={
                      "inline-block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    }
                    defaultValue={contest.time_begin}
                  />
                </div>
                <div className={"inline-block flex-1"}>
                  <span className={"mb-2 block text-sm font-medium text-gray-900"}>Thời gian thi</span>
                  <select
                    id={"duration"}
                    className={
                      "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    }
                    defaultValue={contest.duration}
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
          </div>
        </div>
      </form>
    </div>
  );
}

export default DetailContest;
